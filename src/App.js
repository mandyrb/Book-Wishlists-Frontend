import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes-nav/Routes";
import NavBar from "./routes-nav/NavBar";
import MyBooklistApi from "./api";
import './App.css';
import UserContext from "./UserContext";
import BooksContext from "./BooksContext";
import jwt from "jsonwebtoken";

function App() {

  const[token, setToken] = useState(null);
  const[user, setUser] = useState(null);
  const[books, setBooks] = useState(null);

  async function loginUser(username, password){
    try{
      let token = await MyBooklistApi.login(username, password);
      localStorage.setItem("token", token);
      setToken(token);
      MyBooklistApi.token = token;
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

  // adapted from StackOverflow 6/18 https://stackoverflow.com/questions/43744312/react-js-get-current-date
  function getCurrentDate(){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
  }

  // Get default list of books from NYT API for initial home view

  async function getBooks(){
    if(!books){
      let result = await MyBooklistApi.bookSearch("fiction", getCurrentDate(), user.username);
      setBooks(result);
    }
  }

  // Get list of books when user enters search date and type

  async function getBooksWithSearch(type, date) {
    try{
      let result = await MyBooklistApi.bookSearch(type, date, user.username);
      setBooks(result);
      return true;
    }
    catch(e){
      return e;
    }
  }

  async function addBook(isbn, title, author, bestsellersDate, type, booklistId, username){
    await MyBooklistApi.addBookToList(isbn, title, author, bestsellersDate, type, booklistId, username);
    const tokenFromLocalStorage = localStorage.getItem("token");
    getUserDetails(tokenFromLocalStorage);
  }

  async function removeBook(username, booklistId, isbn){
    await MyBooklistApi.removeBookFromList(username, booklistId, isbn);
    const tokenFromLocalStorage = localStorage.getItem("token");
    getUserDetails(tokenFromLocalStorage);
  }

  async function addBookAndList(name, description, book, isbn, bestsellersDate, type){
    try{
      let booklistId = (await MyBooklistApi.addBooklist(name, description, user.username)).id;
      await addBook(isbn, book.title, book.author, bestsellersDate, type, booklistId, user.username);
      return true;
    }
    catch (e){
      return e;
    }
  }

  async function addList(name, description){
    await MyBooklistApi.addBooklist(name, description, user.username);
    const tokenFromLocalStorage = localStorage.getItem("token");
    getUserDetails(tokenFromLocalStorage);
  }

  async function deleteList(id){
    await MyBooklistApi.deleteBooklist(id, user.username);
    const tokenFromLocalStorage = localStorage.getItem("token");
    getUserDetails(tokenFromLocalStorage);
  }

  function logoutUser(){
    setToken(null);
    setUser(null);
    setBooks(null);
    localStorage.removeItem("token");
  }

  async function getUserDetails(token){
    MyBooklistApi.token = token;
    let { username } = jwt.decode(token);
    let user = await MyBooklistApi.getUser(username);
    setUser(user);
  }

  // Use token in local storage if user returns to same browser

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
      <BooksContext.Provider value={books}>
      <NavBar logoutUser={logoutUser}/>
      <Routes user={user} signupUser = {signupUser} loginUser={loginUser} 
            removeBook={removeBook} addBook={addBook} deleteList={deleteList} addList={addList}
            getBooks={getBooks} addBookAndList={addBookAndList} getBooksWithSearch={getBooksWithSearch}/>
      </BooksContext.Provider>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;


