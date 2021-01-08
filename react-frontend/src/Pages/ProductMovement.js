import React, { useState, useEffect } from "react";
// import { Button, Modal, Form, ModalDescription } from 'semantic-ui-react';
import axios from "axios";
import Dropdown from "../Components/Dropdown";
import MoveForm from "../Components/MoveForm";
import ExportForm from "../Components/ExportForm";
import ImportForm from "../Components/ImportForm";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// import Modalbox from '../Components/Modalbox';

const ProductMovemnent = () => {
  const [movements, setMovements] = useState([]);
  const [options, setOptions] = useState([]);
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [openM, setOpenM] = useState(false);

  const toggle = () => setOpen(!open);
  const exportToggle = () => setOpenE(!openE);
  const moveToggle = () => setOpenM(!openM);

  useEffect(() => {
    fetchlocations();
  }, []);

  useEffect(() => {
    fetchMovements();
  }, []);

  useEffect(() => {
    if (location != "") {
      loca();
    }
  }, [location]);

  const fetchlocations = async () => {
    const response = await fetch("/locations");
    const data = await response.json();
    // console.log(data);
    setOptions(data);
  };

  const changeHandler = (e) => {
    // console.log(e.target.textContent);
    setLocation(e.target.textContent);
  };

  const loca = () => {
    console.log("loca=" + location);
    axios
      .get(`/productmovements?location=${location}`)
      .then((res) => {
        setMovements(res.data);
        // setExportOptions(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchMovements = async () => {
    // const response = await fetch('/productmovement');
    // const data = await response.json();
    axios
      .get("/productmovement")
      .then((res) => {
        console.log("sahdrak");
        console.log(res.data);
        setMovements(res.data);
      })
      .catch((err) => {
        console.log(err + " error");
      });

    // console.log(JSON.stringify(data));
    // setMovements(data);
  };

  const formHandler = (e) => {
    console.log(e);
  };

  const moveFormHandler = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>ProductMovemnent Page</h1>
        <div className="dropdown">
          <Dropdown changeHandler={changeHandler} options={options} />
        </div>
        <div className="button">
          <div className="row-element">
            <Button onClick={toggle}>Import Item</Button>
          </div>
          <div className="row-element">
            <Button onClick={moveToggle}>Move Item</Button>
          </div>
          <div className="row-element">
            <Button onClick={exportToggle}>Export Item</Button>
          </div>
        </div>

        {/* Import Item Modal */}
        <Modal size="large" isOpen={open} toggle={toggle}>
          <ModalHeader>Import Item</ModalHeader>
          <ModalBody>
            <ImportForm location={location} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Export Item Modal */}
        <Modal size="large" isOpen={openE} toggle={exportToggle}>
          <ModalHeader>Export Item</ModalHeader>
          <ModalBody>
            <ExportForm location={location} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={exportToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Move Item Modal */}
        <Modal size="large" isOpen={openM} toggle={moveToggle}>
          <ModalHeader>Move Item</ModalHeader>
          <ModalBody>
            <MoveForm location={location} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={moveToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <div className="table-box">
          <table className="ui celled table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            {console.log(movements + "movements")}
            {movements.map((movement) => (
              <MovementTable
                key={movement}
                id={movement[0]}
                name={movement[1]}
                quantity={movement[2]}
              />
            ))}
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

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
};

export default ProductMovemnent;
