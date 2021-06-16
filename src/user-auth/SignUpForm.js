import React, {useState} from "react";
import {Container, Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import { useHistory } from 'react-router-dom';
import "./SignUpForm.css";

function SignUpForm({signupUser}){
    const initial_state = {firstName: "", username: "", password: ""}
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
        let newUser = await signupUser(formData.firstName, formData.username, formData.password);
        if (newUser === true){
            history.push('/');
        }
        else setInvalidMessage(newUser[0]);
    }

    return(
        <Container>
        <Form className="signup-form" onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="firstName">First Name</Label>
                <Input type="text" name="firstName" id="firstName" onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="username">Username</Label>
                <Input type="text" name="username" id="username" onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="password">Password</Label>
                <Input type="password" name="password" id="password" onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Button color="primary">Submit</Button>
                </FormGroup>
                <br></br>
                {invalidMessage && <h6>{invalidMessage}</h6>}
                <br></br>
                <br></br>
                </Col>
            </Row>
        </Form>
        </Container>
    )
}

export default SignUpForm;