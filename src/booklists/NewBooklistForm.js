import React, {useState} from "react";
import {Container, Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import { useHistory } from 'react-router-dom';

function NewBooklistForm({addList, book, isbn, bestsellersDate, type}){
    const initial_state = {name: "", description: ""}
    const [formData, setFormData] = useState(initial_state);
    const [invalidMessage, setInvalidMessage] = useState(false); 
    const history = useHistory(); 
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData, 
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(Object.values(formData).includes("")) {
            setInvalidMessage("All fields are required");
            return;
        }
        if(formData.description.length > 10) console.log("it's long")
        let added = await addList(formData.name, formData.description, book, isbn, bestsellersDate, type);
        if (added === true){
            history.push('/booklists');
        }
        else setInvalidMessage(added[0]);
    }

    return(
        <Container>
        <Form style={{marginLeft:"10vw"}} className="newBooklist-form" onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                <h3>Create a new list for this book:</h3>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="name">Name</Label>
                <Input type="text" name="name" id="name" onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="description">Description</Label>
                <Input type="text" name="description" id="description" onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Button color="secondary">Submit</Button>
                </FormGroup>
                <br></br>
                {invalidMessage && <h6>{invalidMessage}</h6>}
                </Col>
            </Row>
        </Form>
        </Container>
    )
}

export default NewBooklistForm;