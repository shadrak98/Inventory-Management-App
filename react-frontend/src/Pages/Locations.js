import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { Modal as ModalB, ModalFooter, ModalBody, ModalHeader } from "reactstrap";
import axios from "axios";
import EditForm from "../Components/EditForm";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  // const [query, setQuery] = useState('');

  useEffect(() => {
    fetchlocations();
  }, [locations]);

  const fetchlocations = async () => {
    const response = await fetch("/locations");
    const data = await response.json();
    // console.log(data[0]);
    setLocations(data);
  };

  const searchUpdate = (e) => {
    setLocation(e.target.value);
  };

  const newLocation = () => {
    console.log(location);
    setOpen(false);
    axios.post(`/locations/new/${location}`).then((res) => {
      console.log(res);
      console.log(res.data);
      fetchlocations();
    });
  };

  return (
    <React.Fragment>
      <h1>Locations Page</h1>
      <div className="modalbox">
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Add Location</Button>}
        >
          <Modal.Header>New Location</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Location Name</label>
                <input
                  placeholder="Enter Location Name"
                  onChange={searchUpdate}
                />
              </Form.Field>
              <Button type="submit" onClick={() => newLocation()}>
                Submit
              </Button>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Cancel
            </Button>
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
          {locations.map((location) => (
            <LocationTable
              key={location[0]}
              id={location[0]}
              name={location[1]}
            />
          ))}
        </table>
      </div>
    </React.Fragment>
  );
};

const LocationTable = ({ id, name }) => {

    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    // const editHandler = (id) => {
    //     console.log(id)
        
    // }

    const deleteHandler = (id) => {
        console.log("delete_id "+id);
        axios.delete(`/location/${id}/delete`)
        .then(res => {
            console.log("location deleted-" + res)
        })
        .catch(err => {
            console.log(err)
        });
        
    }

  return (
    <React.Fragment>
    <ModalB size="large" isOpen={open} toggle={toggle}>
        <ModalHeader>
            Location
        </ModalHeader>
        <ModalBody>
            <EditForm title="Location" oldname={name} id={id}></EditForm>
        </ModalBody>        
        <ModalFooter>
            <Button color="black" onClick={toggle}>Cancel</Button>
        </ModalFooter>
    </ModalB>
    <tbody>
      <tr className="center aligned">
        <td>{id}</td>
        <td>{name}</td>
        <td className="right aligned collapsing">
          <Button className="ui labeled icon button" onClick={toggle}>
            <i className="edit icon"></i>Edit
          </Button>
          <Button className="ui labeled icon button" onClick={() => deleteHandler(id)}>
            <i className="trash icon"></i>Delete
          </Button>
        </td>
      </tr>
    </tbody>
    </React.Fragment>
  );
};

export default Locations;
