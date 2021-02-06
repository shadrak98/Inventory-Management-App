import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Dropdown from './Dropdown';
import axios from 'axios';

const ExportForm = ({ location, onClose  }) => {

    const[productOptions, setProductOptions] = useState([]);
    const[quantity, setQuantity] = useState("")
    const[product, setProduct] = useState("")

    useEffect(() => {
        fetchProducts();
    },[]);

    const productHandler = (e) => {
        setProduct(e.target.textContent);
    }

    const fetchProducts = () => {
        console.log("ExportForm, location="+location);
        axios.get(`/productmovements?location=${location}`)
        .then(res => {
            setProductOptions(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const exportFormHandler = () => {
        axios.post(`/productmovement?product=${product}&from=${location}&to=NULL&quantity=${quantity}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
        console.log("ok")
        onClose("export")
        setProduct("");
        setQuantity("");

    }

    return (
        <article>
            <Form className="form">
                <FormGroup>
                    <Label>Product  </Label>
                    <Dropdown changeHandler={productHandler} options={productOptions}></Dropdown>
                </FormGroup>
                <FormGroup>
                    <Label>Quantity </Label>
                    <Input type="text" name="quantity" placeholder="quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}/>
                </FormGroup>
                <Button type="button" onClick={()=>exportFormHandler()}>Submit</Button>
            </Form>
        </article>
    );
}

export default ExportForm;