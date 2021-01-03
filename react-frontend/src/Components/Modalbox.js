import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Modalbox = ({
  title,
  options,
  textlabel,
  dropdownlabel,
  onClickHandler,
}) => {
  const [open, setOpen] = useState(false);
//   const [data, setData] = useState([]);

  const toggle = () => setOpen(!open);
  return (
    // <div>hi</div>
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>

        <Form>
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
  );
};

export default Modalbox;
