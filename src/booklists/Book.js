import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, CardTitle, CardText, CardImg, Button, Jumbotron, ListGroup, ListGroupItem} from "reactstrap";
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

    for (let list of user.booklists){
        for(let book of list.books){
            if(book.isbn === isbn){
                type = book.type;
                bestsellersDate = book.bestsellersDate;
                booklistIds.push(list.id);
            }
        }
    }

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
            <Jumbotron>
                <h1 className="display-3">Book Wishlists</h1>
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
                            <Button className="add-remove-button" onClick={() => removeBookFromList(list.id)}>Remove</Button>
                        </ListGroupItem>
                    :
                        <ListGroupItem className="on-list-title">{book.title} is not currently on {list.name}   
                            <Button className="add-remove-button" onClick={() => addBookToList(list.id)}>Add</Button>
                        </ListGroupItem>
                    }
                    </div>
                ))}
            </ListGroup>
            </Card>
            <br></br>
            <br></br>
            <Card>
            <br></br>
            <h3>Create a new booklist for this book:</h3>
            <br></br>
            <NewBooklistForm addList={addList} book={book} isbn={isbn} bestsellersDate={bestsellersDate} type={type}></NewBooklistForm>
            </Card>
            <br></br>
        </div>
    )
}

export default Book;
