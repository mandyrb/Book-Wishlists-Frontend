import React, {useState} from "react";
import {Container, Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import { useHistory } from 'react-router-dom';

function BookSearchForm({getBooksWithSearch}){
    const initial_state = {date: "", type: "fiction"}
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
        let search = await getBooksWithSearch(formData.type, formData.date);
        if (search === true){
            setInvalidMessage(false);
            history.push('/');
        }
        else setInvalidMessage("Make sure your date is in the correct format.");
    }

    return(
        <Container>
        <Form className="login-form" onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="date">Date (format: YYYY-MM-DD)</Label>
                {invalidMessage && <h6>{invalidMessage}</h6>}
                <Input type="text" name="date" id="date" onChange={handleChange}/>
                </FormGroup>
                <FormGroup tag="fieldset">
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="type" value="fiction" onChange={handleChange}/>{' '}
                    Fiction
                </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="radio" name="type" value="nonfiction" onChange={handleChange}/>{' '}
                    Nonfiction
                </Label>
                </FormGroup>
                </FormGroup>
                <FormGroup>
                <br></br>
                <Button color="primary">Submit</Button>
                </FormGroup>
                <br></br>
                </Col>
            </Row>
        </Form>
        </Container>
    )
}

export default BookSearchForm;