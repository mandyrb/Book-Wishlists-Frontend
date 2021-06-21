import React from "react";
import {Jumbotron, Card, CardBody } from "reactstrap";
import LoginForm from "../user-auth/LoginForm";
import SignUpForm from "../user-auth/SignUpForm";
import "./Home.css";

function Home({loginUser, signupUser}){
    return(
    <div>
        <div>
        <Jumbotron>
            <h1 className="display-3">Book Wishlists</h1>
            <p className="lead">Content here about why the app is great</p>
            {/* <a href="https://developer.nytimes.com/" target="blank">
                <img src="https://developer.nytimes.com/files/poweredby_nytimes_65a.png?v=1583354208350" />
            </a> */}
            <hr className="my-2" />
        </Jumbotron>
        </div>
        <div>
        <Card className="card">
            <CardBody>
            <h1> Login for Existing Users</h1>
            <LoginForm loginUser={loginUser}/>
            </CardBody>
        </Card>
        </div>
        <div>
        <Card className="card">
            <CardBody>
            <h1> Signup for New Users</h1>
            <SignUpForm signupUser={signupUser}/>
            </CardBody>
        </Card>
        </div>
    </div>
    )
}

export default Home;
