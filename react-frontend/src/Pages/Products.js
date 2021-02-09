import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form } from 'semantic-ui-react';
import { Modal as ModalB, ModalFooter, ModalBody, ModalHeader, Form, FormGroup, Button } from "reactstrap";
import axios from 'axios';
import ProductTable from "../Components/ProductTable";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState('');
    // const [query, setQuery] = useState('');

    useEffect(() => {
        fetchproducts();
    },[]);

    // const updateTable = () => {
    //     fetchproducts()
    // }

    const toggle = () => setOpen(!open);

    const fetchproducts = async () => {
        const response = await fetch("/products");
        const data = await response.json();
        // console.log(data[0]);
        setProducts(data);
    }

    const searchUpdate = e => {
        setProduct(e.target.value);
    }

    const newProduct = () => {
        console.log(product)
        axios.post(`/products/new/${product}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            fetchproducts()
        });
        toggle();
    }

    return (
        <React.Fragment>
        <div className="modalbox">
            <Button color="primary" onClick={toggle}>Add Product</Button>
        <ModalB
            size="large"
            isOpen={open}
            toggle={toggle}
        >
            <ModalHeader>Add a Product</ModalHeader>
            <ModalBody>
                <Form >
                    <FormGroup>
                        <label>First Name</label>
                        <input placeholder='Enter Product Name' onChange={searchUpdate}/>
                    </FormGroup>
                    <Button type='button' onClick={() => newProduct()}>Submit</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color='black' onClick={toggle}>
                Cancel
                </Button>
            </ModalFooter>
        </ModalB>
        </div>

        <div className="table">
        <table className="ui celled table">
            <thead>
                <tr className="center aligned">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {products.map(product => (
                <ProductTable 
                    key={product[0]}
                    id={product[0]}
                    name={product[1]}
                    updateTable={() => fetchproducts()}
                />
            ))}
             </table>
        </div>
        </React.Fragment>
    );
}

export default Products;