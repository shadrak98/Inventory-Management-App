import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { Form, Input, Label, Button, FormGroup, Row } from "reactstrap";
import axios from 'axios';

const ModalForm = ({ location, formType, onClose }) => {

  const [quantity, setQuantity] = useState("");
  const [productOptions, setProductOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [product, setProduct] = useState("")
  const [place, setPlace] = useState("")

  useEffect(() => {
    fetchProducts();
    fetchLocations();
    console.log(formType);
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
      axios.get(`/productmovements?location=${location}`)
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

    if(formType === "move") {      
      console.log(place + " " + product + " " + quantity);
      axios.post(`/productmovement?product=${product}&from=${location}&to=${place}&quantity=${quantity}`)
      .then(res => {
          console.log(res);
      })
      .catch(err => {
          console.log(err);
      });
      setPlace("");
      setProduct("");
      setQuantity("");
      onClose(formType);
    } else if(formType === "export") {
      axios.post(`/productmovement?product=${product}&from=${location}&to=NULL&quantity=${quantity}`)
        .then(res => {
            console.log(res.data);    
        })
        .catch(err => {
            console.log(err);
        });
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
            <div className="row-element">
              <FormGroup disabled={(formType === "move")?false:true}>
                <Label>Location </Label>
                <Dropdown
                  changeHandler={(e) => {setPlace(e.target.textContent)}}
                  options={locationOptions}
                ></Dropdown>
              </FormGroup>
            </div>
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
