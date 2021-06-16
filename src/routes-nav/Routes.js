import {Route, Redirect, Switch} from "react-router-dom";
import Home from "../Home";
import React from "react";

function Routes({loginUser, signupUser}){

    // const tokenFromLocalStorage = localStorage.getItem("token");

    return(

        <Switch>
            <Route exact path="/" >
                <Home loginUser={loginUser} signupUser={signupUser}>
                </Home>
            </Route>
            {/* 
            <Route exact path="/companies" >
                {tokenFromLocalStorage ? 
                    <CompanyList/> 
                    :
                    <Redirect to="/" />
                }
            </Route>
            <Route exact path="/companies/:handle" >
                {tokenFromLocalStorage ? 
                    <Company apply={apply}/>
                    :
                    <Redirect to="/" />
                }
            </Route>
            <Route exact path="/jobs" >
                {tokenFromLocalStorage ? 
                    <JobList apply={apply}/> 
                    :
                    <Redirect to="/" />
                }
            </Route>
            <Redirect to="/" /> */}
        </Switch>
    )
}

export default Routes;
