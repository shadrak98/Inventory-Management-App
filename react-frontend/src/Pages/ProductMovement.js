import React, { useState, useEffect } from 'react';
// import { Button, Modal, Form, ModalDescription } from 'semantic-ui-react';
import axios from 'axios';
import Dropdown from '../Components/Dropdown';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// import Modalbox from '../Components/Modalbox';

const ProductMovemnent = () => {

    const [movements, setMovements] = useState([]);
    const [options, setOptions] = useState([]);
    const [location, setLocation] = useState('');
    const [exportOptions, setExportOptions] = useState([]);
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    useEffect(() => {
        fetchlocations();
    },[]);

    useEffect(() => {
        fetchMovements();
    },[]);

    useEffect(() => {
        loca();
    },[location]);

    const fetchlocations = async () => {
        const response = await fetch("/locations");
        const data = await response.json();
        console.log(data);
        setOptions(data);
    } 

    const changeHandler = (e) => {
        // console.log(e.target.textContent);
        setLocation(e.target.textContent);
    }

    

    const loca = () => {
        axios.get(`/productmovements?location=${location}`)
        .then(res => {
            setMovements(res.data);
            setExportOptions(res.data);
        })
        .catch(err => console.log(err));
    }

    const fetchMovements = async() => {
        const response = await fetch('/productmovement');
        const data = await response.json();
        setMovements(data);
    }

    // const exportChangeHandler = (e,data) => {
    //     // console.log(e);
    //     e.preventDefault()
    //     console.log(data)
    // }

    const formHandler = (e) => {
        console.log(e);
    }

    return (
        <React.Fragment>
        <div className='container'>
        <h1>ProductMovemnent Page</h1>
        <div className='dropdown'>
        <Dropdown 
            changeHandler={changeHandler}
            options={options}
        />
        </div>
        <Button floated='right'>Import Item</Button>
        <Button floated='right'>Move Item</Button>
        <Button floated='right' onClick={toggle}>Export Item</Button>
        
        {/* <Modalbox title={'Export Item'}
            options={exportOptions}
            textlabel={'Enter Quantity'}
            dropdownlabel={'Select Product'}
            onClickHandler={exportChangeHandler}
        /> */}
        {/* <Modalbox title={'Move Item'}/> */}
        {/* <Modalbox title={'Import Item'}
            options={}
            textlabel={}
            dropdownlabel={}
            onchangeHandler={}
        /> */}

    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Export Item</ModalHeader>
        <ModalBody>

        <Form onSubmit={formHandler}>
            <FormGroup>
                <Label>Select a Product</Label>
                <Input type="select" name="select" id="exampleSelect">
                    {options.map(items => {
                        <option>{items[1]}</option>
                    })}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Quantity</Label>
                <Input type="number" name="quantity" id="quantity" placeholder="for example 10"/>
            </FormGroup>
            <Button type="submit" onClick={() => setOpen(false)}>Done</Button>
        </Form>
        </ModalBody> 
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
        </div>
        
        <div className="table-box">
        <table className="ui celled table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            {movements.map(movement => (
                <MovementTable 
                    key={movement}
                    id={movement[0]}
                    name={movement[1]}
                    quantity={movement[2]}
                />
            ))}
             </table>
        </div>
        </React.Fragment>
    );
}

const MovementTable = ({ id, name, quantity }) => {
    return (
        <tbody>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{quantity}</td>
            </tr>
        </tbody>
    );
}

export default ProductMovemnent;