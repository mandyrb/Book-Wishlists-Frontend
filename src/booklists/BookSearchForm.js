import React, {useState} from "react";
import {Container, Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

function BookSearchForm({getBooksWithSearch}){
    const [type, setType] = useState("fiction");
    const [date, setDate] = useState(new Date());
    const [invalidMessage, setInvalidMessage] = useState(false); 
    const history = useHistory(); 
    
    const handleChange = (e) => {
        const { value } = e.target;
        setType(type => (value));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formattedDate;
        if(date){
            setInvalidMessage(false);
            // adapted from StackOverflow 6/18 https://stackoverflow.com/questions/43744312/react-js-get-current-date
            formattedDate = `${date.getFullYear()}-${(date.getMonth()+1)<10?`0${(date.getMonth()+1)}`:`${(date.getMonth()+1)}`}-${(date.getDate())<10?`0${(date.getDate())}`:`${(date.getDate())}`}`;
        }
        else{
            setInvalidMessage("You must enter a date to search by date");
            return;
        }
        
        await getBooksWithSearch(type, formattedDate);
    }

    return(
        <Container>
        <Form className="login-form" onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                <br></br>
                <FormGroup>
                {invalidMessage && <h6>{invalidMessage}</h6>}
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    minDate={new Date(2011, 2)}
                    maxDate={new Date()}
                    showDisabledMonthNavigation
                />
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