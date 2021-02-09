import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "../Components/Dropdown";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import ModalForm from "../Components/ModalForm";

const ProductMovemnent = () => {
  const [movements, setMovements] = useState([]);
  const [options, setOptions] = useState([]);
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [alertOpen, setAlert] = useState(false);

  const toggle = () => setOpen(!open);
  const exportToggle = () => setOpenE(!openE);
  const moveToggle = () => setOpenM(!openM);
  const alertToggle = () => setAlert(!alertOpen);

  useEffect(() => {
    fetchlocations();
    fetchMovements();
  }, []);

  useEffect(() => {
    if (location != "") {
      console.log("inside useeffect -- loca");
      loca();
    }
  }, [location]);

  const submitModal = (modal) => {
    if (modal === "import") {
      setOpen(false);
    } else if (modal === "export") {
      setOpenE(false);
    } else if (modal === "move") {
      setOpenM(false);
    }
    loca();
  };

  const showAlert = (alert) => {
    if(alert){
      alertToggle();
    }
  }

  const fetchlocations = async () => {
    const response = await fetch("/locations");
    const data = await response.json();
    // console.log(data);
    setOptions(data);
  };

  const changeHandler = (e) => {
    // console.log(e.target.textContent);
    setLocation(e.target.textContent);
    loca();
  };

  const loca = () => {
    axios
      .get(`/productmovements_locationwise?location=${location}`)
      .then((res) => {
        setMovements(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchMovements = async () => {
    axios
      .get("/productmovement")
      .then((res) => {
        setMovements(res.data);
      })
      .catch((err) => {
        console.log(err + " error");
      });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div>
          <Alert isOpen={alertOpen} toggle={alertToggle} color="danger">Quantity entered is greater than it should be! Please refill the form.</Alert>
        </div>
        <div className="dropdown">
          <Dropdown changeHandler={changeHandler} options={options} />
        </div>
        <div className="button">
          <div className="row-element">
            <Button
              onClick={toggle}
              disabled={location ? false : true}
              color="primary"
            >
              Import Item
            </Button>
          </div>
          <div className="row-element">
            <Button
              onClick={moveToggle}
              disabled={location ? false : true}
              color="primary"
            >
              Move Item
            </Button>
          </div>
          <div className="row-element">
            <Button
              onClick={exportToggle}
              disabled={location ? false : true}
              color="primary"
            >
              Export Item
            </Button>
          </div>
        </div>

        
    
        {/* Import Item Modal */}
        <Modal size="large" isOpen={open} toggle={toggle}>
          <ModalHeader>Import Item</ModalHeader>
          <ModalBody>
            {/* <ImportForm location={location} /> */}
            <ModalForm location={location} formType="import" movements={movements} alert={(alert) => showAlert(alert)} onClose={(modal) =>submitModal(modal)}/>
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
            {/* <ExportForm
              location={location}
              onClose={(modal) => submitModal(modal)}
            /> */}
            <ModalForm location={location} formType="export" movements={movements} alert={(alert) => showAlert(alert)} onClose={(modal) =>submitModal(modal)}/>
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
            {/* <MoveForm location={location} /> */}
            <ModalForm location={location} formType="move" movements={movements} alert={(alert) => showAlert(alert)} onClose={(modal) =>submitModal(modal)}/>
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
            {/* {console.log(movements + "----movements")} */}
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
