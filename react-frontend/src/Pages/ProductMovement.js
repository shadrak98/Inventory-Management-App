import React, { useState, useEffect } from 'react';
// import { Button, Modal, Form, ModalDescription } from 'semantic-ui-react';
import axios from 'axios';
import Dropdown from '../Components/Dropdown';
import Modalbox from '../Components/Modalbox';

const ProductMovemnent = () => {

    const [movements, setMovements] = useState([]);
    const [options, setOptions] = useState([]);
    const [location, setLocation] = useState('');

    useEffect(() => {
        fetchlocations();
    },[]);

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

    useEffect(() => {
        loca();
    },[location]);

    const loca = () => {
        axios.get(`/productmovements?location=${location}`)
        .then(res => {
            console.log(res);
            setMovements(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchMovements();
    },[]);

    const fetchMovements = async() => {
        const response = await fetch('/productmovement');
        const data = await response.json();
        console.log(data);
        setMovements(data);
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
        {/* <Button floated='right'>Import Item</Button>
        <Button floated='right'>Move Item</Button>
        <Button floated='right'>Export Item</Button> */}
        
        <Modalbox title={'Export Item'}/>
        <Modalbox title={'Move Item'}/>
        <Modalbox title={'Import Item'}/>
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