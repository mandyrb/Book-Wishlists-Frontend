import React, {useContext, useEffect} from "react";
import {Jumbotron, Card, CardBody, CardTitle, CardText, Form, Button, ListGroup} from "reactstrap";
import UserContext from "../UserContext";
import BooksContext from "../BooksContext";
import { useHistory } from 'react-router-dom';
import LoadingSpinner from "../LoadingSpinner";
import "./Home.css";
import BookSearchForm from "../booklists/BookSearchForm";

function UserHome({getBooks, getBooksWithSearch}){
    const user = useContext(UserContext);
    const books = useContext(BooksContext);
    const history = useHistory(); 

    useEffect(() => {
        getBooks();
    }, []);

    const handleSubmit = async (book) => {
        history.push(`/book/${book.isbn}`);
    }

    if (!books) return <LoadingSpinner />
        return(
            <div>
                <div>
                <Jumbotron>
                    <h1 className="display-3">Book Wishlists</h1>
                    <p className="lead">Content here about why the app is great</p>
                </Jumbotron>
                </div>
            <Card>
                <br></br>
                <h1>Welcome {user.firstName}!</h1>
                <br></br>
                <p>Search for books from the New York Times bestsellers list by date</p>
                <p>Or see below for the top 10 fiction books on the current bestsellers list</p>
                <BookSearchForm getBooksWithSearch={getBooksWithSearch}/>
            </Card>
            <br></br>
                <ListGroup className = "booklists-list">
                    {books.map(book => (
                    <div key={book.isbn}>
                        <Card className = "book-card">
                        <CardBody>
                            <CardTitle className="book-card-title">{book.title}</CardTitle>
                            <CardText>{book.author}</CardText>
                            <Form onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(book);}}>
                                <Button >View Book Details</Button>
                            </Form>
                        </CardBody>
                        </Card>
                    </div>
                    ))}
                </ListGroup>
            </div>
        )
}

export default UserHome;
