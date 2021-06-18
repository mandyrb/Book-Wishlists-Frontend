import {Route, Redirect, Switch} from "react-router-dom";
import Home from "../home-views/Home";
import UserHome from "../home-views/UserHome";
import BookList from "../booklists/BookList";
import Book from "../booklists/Book";
import React, {useContext} from "react";
import UserContext from "../UserContext";

function Routes({loginUser, signupUser, removeBook, addBook, getBooks, addList, getBooksWithSearch, deleteList}){
    const user = useContext(UserContext);

    return(

        <Switch>
            <Route exact path="/" >
                {user ? 
                <UserHome getBooks={getBooks} getBooksWithSearch={getBooksWithSearch}/>
                :
                <Home loginUser={loginUser} signupUser={signupUser}>
                </Home>
                }
            </Route>
            <Route exact path="/booklists" >
                {user ? 
                <BookList deleteList={deleteList}/>
                :
                <Redirect to="/" />
                }
            </Route>
            <Route exact path="/book/:isbn" >
            {/* <Route exact path="/book/:type/:date/:isbn" > */}
                {user ? 
                <Book removeBook={removeBook} addBook={addBook} addList={addList}/> 
                :
                <Redirect to="/" />
                }
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default Routes;
