import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

const Modalbox = ({title, options, textlabel, dropdownlabel, onchangeHandler}) => {
    const [open, setOpen] = useState(false);

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button floated='right'>{title}</Button>}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <Form >
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Select}
                            label={dropdownlabel}
                            options={options}
                            placeholder={dropdownlabel}
                            onChange={onchangeHandler}
                        />
                        <Form.Field
                            control={Input}
                            label={textlabel}
                            placeholder={textlabel}
                        />
                    </Form.Group>
                    <Button type='submit' onClick={() => newProduct()}>Submit</Button>
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
    );
}

export default Modalbox;