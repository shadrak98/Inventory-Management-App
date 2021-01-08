import React, { useState, useEffect } from 'react';
import { Form, Button, Label, Input, FormGroup, Row } from 'reactstrap';
import Dropdown from './Dropdown';
import axios from 'axios';

const MoveForm = ({ location }) => {

    const[productOptions, setProductOptions] = useState([])
    const[locationOptions, setLocationOptions] = useState([])
    const[quantity, setQuantity] = useState("")
    const[product, setProduct] = useState("")
    const[place, setPlace] = useState("")

    useEffect(() => {
        fetchProducts();
        fetchLocations();
    },[]);

    const productHandler = (e) => {
        setProduct(e.target.textContent);
    }

    const locationHandler = (e) => {
        setPlace(e.target.textContent);
    }

    const fetchProducts = () => {
        console.log("MoveForm, location="+location);
        axios.get(`/productmovements?location=${location}`)
        .then(res => {
            setProductOptions(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const fetchLocations = () => {
        console.log("location="+location);
        axios.get(`/locations?location=${location}`)
        .then(res => {
            setLocationOptions(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const moveFormHandler = (e) => {
        // e.preventDefault();
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
    }

    return(
        <article>
        <Form className="form" onSubmit={moveFormHandler}>
            <div className="row">
                <Row>
                    <div className="row-element">
                        <FormGroup>
                            <Label>Product </Label>
                            <Dropdown changeHandler={productHandler} options={productOptions}></Dropdown>
                        </FormGroup>
                    </div>
                    <div className="row-element">
                        <FormGroup>
                            <Label>Location </Label>
                            <Dropdown changeHandler={locationHandler} options={locationOptions}></Dropdown>
                        </FormGroup>
                    </div>
                </Row>
            </div>
            <FormGroup>
                <Label>Quantity</Label>
                <Input type="text" id="quantity" name="quantity" placeholder="quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
            </FormGroup>
            <Button type="submit" >Submit</Button> 
        </Form>
        </article>
    );
}

export default MoveForm;