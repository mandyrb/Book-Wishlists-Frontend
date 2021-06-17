import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes-nav/Routes";
import NavBar from "./routes-nav/NavBar";
import MyBooklistApi from "./api";
import './App.css';
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";

function App() {

  const[token, setToken] = useState(null);
  const[user, setUser] = useState(null);

  async function loginUser(username, password){
    try{
      let token = await MyBooklistApi.login(username, password);
      localStorage.setItem("token", token);
      setToken(token);
      MyBooklistApi.token = token;
      console.log(token);
      return true;
    }
    catch(e){
      return e;
    }
  }

  async function signupUser(username, password, firstName){
    try{
      let token = await MyBooklistApi.signup(username, password, firstName);
      localStorage.setItem("token", token);
      setToken(token);
      MyBooklistApi.token = token;
      return true;
    }
    catch(e){
      return e;
    }
  }
  async function addBook(isbn, title, author, bestsellersDate, type, booklistId, username){
    let result = await MyBooklistApi.addBookToList(isbn, title, author, bestsellersDate, type, booklistId, username);
    // setUser(user.booklists.[booklistId].books.push(result.book));
  }

  async function removeBook(username, password, firstName){
    console.log("in remove function");
    // try{
    //   let token = await MyBooklistApi.signup(username, password, firstName);
    //   localStorage.setItem("token", token);
    //   setToken(token);
    //   MyBooklistApi.token = token;
    //   return true;
    // }
    // catch(e){
    //   return e;
    // }
  }

  function logoutUser(){
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  }

  async function getUserDetails(token){
    MyBooklistApi.token = token;
    let { username } = jwt.decode(token);
    let user = await MyBooklistApi.getUser(username);
    setUser(user);
  }

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if(tokenFromLocalStorage){
      getUserDetails(tokenFromLocalStorage);
    }
  },[token]);

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={user}>
      <NavBar logoutUser={logoutUser}/>
      <Routes user={user} signupUser = {signupUser} loginUser={loginUser} removeBook={removeBook} addBook={addBook}/>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;


