import React, {useState} from "react";
import {Container, Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import { useHistory } from 'react-router-dom';
import "./LoginForm.css";

function LoginForm({loginUser}){
    const initial_state = {usernameLogin: "", passwordLogin: ""}
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

    // Handle login submission or provide error messaging

    const handleSubmit = async (e) => {
        e.preventDefault();
        let login = await loginUser(formData.usernameLogin, formData.passwordLogin);
        if (login === true){
            history.push('/');
        }
        
        else setInvalidMessage(login[0]);
    }

    return(
        <Container>
        <Form className="login-form" onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="usernameLogin">Username</Label>
                <Input type="text" name="usernameLogin" id="usernameLogin" onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Label style={{marginBottom:"10px"}} htmlFor="passwordLogin">Password</Label>
                <Input type="password" name="passwordLogin" id="passwordLogin" onChange={handleChange}/>
                </FormGroup>
                <br></br>
                <FormGroup>
                <Button color="primary">Submit</Button>
                </FormGroup>
                <br></br>
                {invalidMessage && <h6>{invalidMessage}</h6>}
                </Col>
            </Row>
        </Form>
        </Container>
    )
}

export default LoginForm;