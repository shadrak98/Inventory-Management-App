import React, {useState} from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const EditForm = ({ title, oldname, id, onClose }) => {

    const [value, setValue] = useState(oldname);

    const FormHandler = () => {
        console.log(id + oldname + title + value);
        if(title === "Location") {
            axios.post(`/location/update/${id}/${value}`)
            .then(res => {
                console.log(res);
                onClose();
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            axios.post(`/product/update/${id}/${value}`)
            .then(res => {
                console.log(res);
                onClose();
            })
            .catch(err => {
                console.log(err);
            })
        }
        
    }

    return (
        <article>
            <Form>
                <FormGroup>
                    <Label>New {title} Name</Label>
                    <Input type="text" name="name" value={value} onChange={(e) => {setValue(e.target.value)}}></Input>
                </FormGroup>
                <Button type="button" onClick={() => FormHandler()}>Submit</Button>
            </Form>
        </article>
    );
} 

export default EditForm;