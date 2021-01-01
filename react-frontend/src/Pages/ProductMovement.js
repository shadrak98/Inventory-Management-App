import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

const ProductMovemnent = () => {

    const [movements, setMovements] = useState([]);

    useEffect(() => {
        fetchMovements();
    },[]);

    const fetchMovements = async() => {
        const response = await fetch('/productmovement');
        const data = response.json();
        console.log(data);
        setMovements(data);
    }

    return (
        <React.Fragment>
        <h1>ProductMovemnent Page</h1>
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