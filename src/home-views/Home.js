import React from "react";
import {Jumbotron, Card, CardBody, Container, Col, Row } from "reactstrap";
import LoginForm from "../user-auth/LoginForm";
import SignUpForm from "../user-auth/SignUpForm";
import "./Home.css";

function Home({loginUser, signupUser}){
    return(
    <div>
        <div>
        <Jumbotron className="home-jumbotron">
            <h1 className="display-3">Book Wishlists</h1>
            <br></br>
            <h4>Do you have a hard time finding books 
                you want to read?</h4>
            <h4> Book Wishlists is made for you!</h4>
            <br></br>
            <p className="lead"> Book Wishlists
                is a resource for finding high quality books, by searching the New 
                York Times Bestsellers lists. Once you find a book you like, you 
                can create a custom list for it, or add it to one or more lists you've 
                already created. Whenever you're ready to get a new book, Book Wishlists 
                will be here to help you remember all those great books you've been meaning to read!
                All data is provided by The New York Times.</p>
            <br></br>
            {/* The following anchor tag can be used if the site develops further and has additional
            branding/logos on the page:
            <a href="https://developer.nytimes.com/" target="blank">
                <img src="https://developer.nytimes.com/files/poweredby_nytimes_65a.png?v=1583354208350" />
            </a> */}
        </Jumbotron>
        </div>
        <Container>
            <Row>
            <Col md="6">
            <Card className="card">
                <CardBody>
                <h1> Login for Existing Users</h1>
                <LoginForm loginUser={loginUser}/>
                </CardBody>
            </Card>
            <br></br>
            </Col>
            <Col md="6">
            <Card className="card">
                <CardBody>
                <h1> Signup for New Users</h1>
                <SignUpForm signupUser={signupUser}/>
                </CardBody>
            </Card>
            </Col>
            </Row>
        </Container>
        <br></br>
    </div>
    )
}

export default Home;
