import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, CardText, CardImg, Button, Jumbotron, ListGroup, ListGroupItem} from "reactstrap";
import "./Book.css";
import LoadingSpinner from "../LoadingSpinner";
import { useParams, useHistory } from "react-router-dom";
import MyBookListApi from "../api";
import NewBooklistForm from "./NewBooklistForm";
import UserContext from "../UserContext";
import BooksContext from "../BooksContext";

function Book({removeBook, addBook, addList}){
    const user = useContext(UserContext);
    const books = useContext(BooksContext);
    const history = useHistory(); 
    const { isbn } = useParams();
    const [book, setBook] = useState(null);
    let type, bestsellersDate;
    let booklistIds = [];

    // Loop over the user's booklists and the books on those lists,
    // to find which of those lists the selected book may be on & add id to booklistIds
    // Also set the type and bestsellers date equal to that of the selected book

    for (let list of user.booklists){
        for(let book of list.books){
            if(book.isbn === isbn){
                type = book.type;
                bestsellersDate = book.bestsellersDate;
                booklistIds.push(list.id);
            }
        }
    }

    // If the book isn't on one of the user's lists, set the type and bestsellers 
    // date equalto that of the selected book

    if (booklistIds.length === 0){
        for(let book of books){
            if(book.isbn === isbn){
                type = book.type;
                bestsellersDate = book.bestsellersDate;
            }
        }
    }

    function handleAmazonClick(){
        window.open(`${book.amazonLink}`,'_blank');
    }

    const addBookToList = async function(listId){
        await addBook(isbn, book.title, book.author, bestsellersDate, type, listId, user.username);
        history.push("/booklists");
    }

    const removeBookFromList = async function(listId){
        await removeBook(user.username, listId, isbn);
        history.push("/booklists");
    }

    useEffect(() => {
        async function getBookDetails() {
            let result = await MyBookListApi.getBook(type, bestsellersDate, isbn, user.username)
            setBook(result);
        }
        getBookDetails();
    }, [isbn]);

    if (!book) return <LoadingSpinner />

    return(
        <div>
            <div>
            <Jumbotron className="book-jumbotron">
                <h1 className="display-3">Book Wishlists</h1>
                <br></br>
                <p className="lead"> Below, check out detailed information about your selected book. If you like,
                    you can add or remove this book from one of your existing booklists, or
                    create a new list for this book. All data is provided by The New York Times.</p>
                    {/* The following anchor tag can be used if the site develops further and has additional
                    branding/logos on the page:
                    <a href="https://developer.nytimes.com/" target="blank">
                        <img src="https://developer.nytimes.com/files/poweredby_nytimes_65a.png?v=1583354208350" />
                    </a> */}
                <br></br>
            </Jumbotron>
            </div>
            <Card className = "book">
                <br></br>
                <h1>{book.title}</h1>
                <CardText>Written by {book.author}</CardText>
                <CardBody>
                    <CardImg className="book-image" src={book.coverUrl} alt="Card image cap" />
                    <br></br>
                    <CardText>{book.description}</CardText>
                    <Button onClick={handleAmazonClick}>Check out on Amazon</Button>
                </CardBody>
            </Card>
            <br></br>
            <br></br>
            <Card className = "books-on-lists">
            <ListGroup>
                {user.booklists.map(list => ( 
                    <div key={list.id}>
                    {booklistIds.includes(list.id)?
                        <ListGroupItem className="on-list-title">{book.title} is currently on {list.name}   
                            <Button className="add-remove-button" onClick={(e) => {
                                e.preventDefault();
                                removeBookFromList(list.id);}}>Remove</Button>
                        </ListGroupItem>
                    :
                        <ListGroupItem className="on-list-title">{book.title} is not currently on {list.name}   
                            <Button className="add-remove-button" onClick={(e) => {
                                e.preventDefault();
                                addBookToList(list.id);}}>Add</Button>
                        </ListGroupItem>
                    }
                    </div>
                ))}
            </ListGroup>
            </Card>
            <br></br>
            <br></br>
            <Card className="new-booklist-form">
            <br></br>
            <br></br>
            <NewBooklistForm addList={addList} book={book} isbn={isbn} bestsellersDate={bestsellersDate} type={type}></NewBooklistForm>
            </Card>
            <br></br>
        </div>
    )
}

export default Book;
