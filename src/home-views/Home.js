import React, {useContext} from "react";
import {Jumbotron, Card, CardBody} from "reactstrap";
// import UserContext from "./UserContext";
import LoginForm from "../user-auth/LoginForm";
import SignUpForm from "../user-auth/SignUpForm";
// import "../user-auth/LoginForm.css";
import "./Home.css";

function Home({loginUser, signupUser}){
    // const user = useContext(UserContext);
    return(
    <div>
        <div>
        <Jumbotron>
            <h1 className="display-3">Book Wishlists</h1>
            <p className="lead">Content here about why the app is great</p>
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
