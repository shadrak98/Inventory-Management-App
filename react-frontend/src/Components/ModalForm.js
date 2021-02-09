import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { Form, Input, Label, Button, FormGroup, Row } from "reactstrap";
import axios from 'axios';

const ModalForm = ({ location, formType, onClose, movements, alert }) => {

  const [quantity, setQuantity] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [product, setProduct] = useState("")
  const [place, setPlace] = useState("")
  // const [movements, setMovements] = useState([])

  useEffect(() => {
    fetchProducts();
    fetchLocations();
  },[]);
  
  const fetchProducts = () => {
    if(formType === "import") {
      axios.get('/products')
        .then(res => {
            setProductOptions(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    } else {
      axios.get(`/productmovements_locationwise?location=${location}`)
      .then(res => {
        setProductOptions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  const fetchLocations = () => {
    axios.get(`/locations?location=${location}`)
    .then(res => {
      setLocationOptions(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const FormHandler = () => {

    let new_movements = new Map();
    let k,v;
    movements.map((movement) => {
      k = movement[1];
      v = movement[2];
      new_movements.set(k,v)
    });
    // console.log(new_movements);
    // console.log(new_movements.get(product));

    if(formType === "move") {      
      if(new_movements.get(product) >= quantity) {
        console.log(place + " " + product + " " + quantity);
        axios.post(`/productmovement?product=${product}&from=${location}&to=${place}&quantity=${quantity}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
      } else {
        alert(true);
      }
      setPlace("");
      setProduct("");
      setQuantity("");
      onClose(formType);
    } else if(formType === "export") {
      if(new_movements.get(product) >= quantity) {
        axios.post(`/productmovement?product=${product}&from=${location}&to=NULL&quantity=${quantity}`)
        .then(res => {
            console.log(res.data);    
        })
        .catch(err => {
            console.log(err);
        });
      } else {
        alert(true);
      }
      console.log("ok")
      onClose(formType);
      setProduct("");
      setQuantity("");
    } else {
      console.log("inside importForm handler")
      axios.post(`/productmovement?product=${product}&from=NULL&to=${location}&quantity=${quantity}`)
      .then(res => {
          console.log(res.data+"import response");
      })
      .catch(err => {
          console.log(err);
      });
      onClose(formType);
      setProduct("");
      setQuantity("");
    }
  }

  return (
    <article>
      <Form>
        <div className="row">
          <Row>
            <div className="row-element">
              <FormGroup>
                <Label>Product</Label>
                <Dropdown changeHandler={(e) => {setProduct(e.target.textContent)}} options={productOptions}></Dropdown>
              </FormGroup>
            </div>
            {(formType==='move') && <div className="row-element">
              <FormGroup>
                <Label>Location </Label>
                <Dropdown
                  changeHandler={(e) => {setPlace(e.target.textContent)}}
                  options={locationOptions}
                ></Dropdown>
              </FormGroup>
            </div>}
          </Row>
        </div>
        <FormGroup>
          <Label>Quantity </Label>
          <Input
            type="text"
            name="quantity"
            placeholder="quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </FormGroup>
        <Button type="button" onClick={() => FormHandler()}>Submit</Button>
      </Form>
    </article>
  );
};

export default ModalForm;
