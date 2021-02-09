import React, { useState } from 'react';
import { Modal as ModalB, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from 'axios';
import EditForm from './EditForm';

const ProductTable = ({ id, name, updateTable }) => {

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
        updateTable();
    }

    const deleteHandler = (id) => {
        console.log("delete_id "+id);
        axios.delete(`/products/${id}/delete`)
        .then(res => {
            console.log("product deleted-" + res);
            updateTable();
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
            <EditForm title="Product" oldname={name} id={id} onClose={toggle}></EditForm>
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

export default ProductTable;