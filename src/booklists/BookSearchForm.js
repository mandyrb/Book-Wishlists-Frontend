import React, {useState} from "react";
import {Container, Form, FormGroup, Row, Col, Label, Input, Button} from "reactstrap";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

function BookSearchForm({getBooksWithSearch}){
    const [type, setType] = useState("fiction");
    const [date, setDate] = useState(new Date());
    const [invalidMessage, setInvalidMessage] = useState(false); 
    
    const handleChange = (e) => {
        const { value } = e.target;
        setType(type => (value));
    }

    // Make API call to get books on desired date & for desired type

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
        <Form style={{marginLeft:"10vw"}} onSubmit={handleSubmit}>
            <Row>
                <Col xs={10}>
                <br></br>
                <FormGroup>
                {invalidMessage && <h6>{invalidMessage}</h6>}
                </FormGroup>
                <FormGroup tag="fieldset">
                <FormGroup check inline>
                <Label check>
                    <Input type="radio" name="type" value="fiction" onChange={handleChange}/>{' '}
                    Fiction
                </Label>
                </FormGroup>
                <FormGroup check inline>
                <Label check>
                    <Input  type="radio" name="type" value="nonfiction" onChange={handleChange}/>{' '}
                    Nonfiction
                </Label>
                </FormGroup>
                </FormGroup>
                <FormGroup>
                <br></br>
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    minDate={new Date(2011, 2)}
                    maxDate={new Date()}
                    showDisabledMonthNavigation
                />
                </FormGroup>
                <FormGroup>
                <br></br>
                <Button color="secondary">Submit</Button>
                </FormGroup>
                <br></br>
                </Col>
            </Row>
        </Form>
        </Container>
    )
}

export default BookSearchForm;