import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

const Locations = () => {

    const [locations, setLocations] = useState([]);
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState('');
    // const [query, setQuery] = useState('');

    useEffect(() => {
        fetchlocations();
    },[]);

    const fetchlocations = async () => {
        const response = await fetch("/locations");
        const data = await response.json();
        // console.log(data[0]);
        setLocations(data);
    }

    const searchUpdate = e => {
        setLocation(e.target.value);
    }

    const newLocation = () => {
        console.log(location)
        setOpen(false)
        axios.post(`/locations/new/${location}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            fetchlocations()
        });
    }

    return (
        
        <React.Fragment>
        <h1>Locations Page</h1>
        
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Add Location</Button>}
        >
            <Modal.Header>New Location</Modal.Header>
            <Modal.Content>
                <Form >
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='Enter Location Name' onChange={searchUpdate}/>
                    </Form.Field>
                    <Button type='submit' onClick={() => newLocation()}>Submit</Button>
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
            {locations.map(location => (
                <LocationTable 
                    key={location}
                    id={location[0]}
                    name={location[1]}
                />
            ))}
             </table>
        </div>
        </React.Fragment>
    );
}

const LocationTable = ({ id, name }) => {
    return (
        
            <tbody>
                <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                </tr>
            </tbody>

    );
}

export default Locations;