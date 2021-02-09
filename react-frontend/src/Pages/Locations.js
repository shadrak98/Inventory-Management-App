import React, { useState, useEffect } from "react";
import { Modal as ModalB, ModalFooter, ModalBody, ModalHeader, Form, FormGroup, Button } from "reactstrap";
import axios from "axios";
import LocationTable from "../Components/LocationTable";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  // const [query, setQuery] = useState('');

  useEffect(() => {
    fetchlocations();
  }, []);

  const updateTable = ()=>{
    fetchlocations()
  }

  const toggle = () => setOpen(!open);

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
    axios.post(`/locations/new/${location}`).then((res) => {
      console.log(res);
      console.log(res.data);
      fetchlocations();
    });
    toggle();
  };

  return (
    <React.Fragment>
      <div className="modalbox">
      <Button color="primary" onClick={toggle}>Add Location</Button>
        <ModalB
          size="large"
          isOpen={open}
          toggle={toggle}
        >
          <ModalHeader>New Location</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <label>Location Name</label>
                <input
                  placeholder="Enter Location Name"
                  onChange={searchUpdate}
                />
              </FormGroup>
              <Button type="button" onClick={() => newLocation()}>
                Submit
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="black" onClick={toggle}>
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
          {locations.map((location) => (
            <LocationTable
              key={location[0]}
              id={location[0]}
              name={location[1]}
              updateTable={() => fetchlocations()}
            />
          ))}
        </table>
      </div>
    </React.Fragment>
  );
};

export default Locations;
