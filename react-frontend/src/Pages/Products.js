import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState('');
    // const [query, setQuery] = useState('');

    useEffect(() => {
        fetchproducts();
    },[]);

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
        setOpen(false)
        axios.post(`/products/new/${product}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            fetchproducts()
        });
    }

    return (
        <React.Fragment>
        <h1>Products Page</h1>
        
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Add Product</Button>}
        >
            <Modal.Header>Add a Product</Modal.Header>
            <Modal.Content>
                <Form >
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='Enter Product Name' onChange={searchUpdate}/>
                    </Form.Field>
                    <Button type='submit' onClick={() => newProduct()}>Submit</Button>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                Cancel
                </Button>
                {/* <Button color='green' onClick={() => setOpen(false)}>
                    Done
                </Button> */}
            </Modal.Actions>
        </Modal>

        <div className="table-box">
        <table className="ui celled table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            {products.map(product => (
                <ProductTable 
                    key={product}
                    id={product[0]}
                    name={product[1]}
                />
            ))}
             </table>
        </div>
        </React.Fragment>
    );
}

const ProductTable = ({ id, name }) => {
    return (
        
            <tbody>
                <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                </tr>
            </tbody>

    );
}


export default Products;