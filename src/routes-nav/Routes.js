import {Route, Redirect, Switch} from "react-router-dom";
import Home from "../Home";
import BookList from "../booklists/BookList";
import Book from "../booklists/Book";
import React, {useContext} from "react";
import UserContext from "../UserContext";

function Routes({loginUser, signupUser, removeBook, addBook}){
    const user = useContext(UserContext);

    return(

        <Switch>
            <Route exact path="/" >
                {user ? 
                <BookList/>
                :
                <Home loginUser={loginUser} signupUser={signupUser}>
                </Home>
                }
            </Route>
            <Route exact path="/book/:isbn" >
            {/* <Route exact path="/book/:type/:date/:isbn" > */}
                {user ? 
                <Book removeBook={removeBook} addBook={addBook}/> 
                :
                <Redirect to="/" />
                }
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default Routes;
