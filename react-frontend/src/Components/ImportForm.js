import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Dropdown from './Dropdown';
import axios from 'axios';

const ImportForm = ({ location }) => {

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
        console.log("ImportForm, location="+location);
        axios.get('/products')
        .then(res => {
            setProductOptions(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const importFormHandler = (e) => {
        console.log()
        axios.post(`/productmovement?product=${product}&from='NULL'&to=${location}&quantity=${quantity}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
        setProduct("");
        setQuantity("");
    }

    return (
        <article>
            <Form className="form" onSubmit={importFormHandler}>
                <FormGroup>
                    <Label>Product  </Label>
                    <Dropdown changeHandler={productHandler} options={productOptions}></Dropdown>
                </FormGroup>
                <FormGroup>
                    <Label>Quantity </Label>
                    <Input type="text" name="quantity" placeholder="quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}/>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </article>
    );
}

export default ImportForm;