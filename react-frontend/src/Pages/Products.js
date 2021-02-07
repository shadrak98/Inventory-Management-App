import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { Modal as ModalB, ModalFooter, ModalBody, ModalHeader } from "reactstrap";
import axios from 'axios';
import EditForm from "../Components/EditForm";

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
        <div className="modalbox">
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
                />
            ))}
             </table>
        </div>
        </React.Fragment>
    );
}

const ProductTable = ({ id, name }) => {

    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    // const editHandler = (id) => {
    //     console.log(id)
    // }

    const deleteHandler = (id) => {
        console.log("delete_id "+id);
        axios.delete(`/products/${id}/delete`)
        .then(res => {
            console.log("product deleted-" + res)
        })
        .catch(err => {
            console.log(err)
        });
        
    }

    return (
        <React.Fragment>
            <ModalB size="large" isOpen={open} toggle={toggle}>
        <ModalHeader>
            Product
        </ModalHeader>
        <ModalBody>
            <EditForm title="Product" oldname={name} id={id}></EditForm>
        </ModalBody>        
        <ModalFooter>
            <Button color="black" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </ModalB>  
            <tbody>
                <tr className="center aligned">
                    <td>{id}</td>
                    <td>{name}</td>
                    <td className="right alligned collapsing">
                        <Button className="ui labeled icon button" onClick={toggle}><i className="edit icon"></i> Edit </Button>
                        <Button className="ui labeled icon button" onClick={() => deleteHandler(id)}><i className="trash icon"></i> Delete </Button></td>
                </tr>
            </tbody>
        </React.Fragment>
    );
}


export default Products;