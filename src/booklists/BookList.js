import React, {useContext} from "react";
import {Card, CardBody, CardTitle, CardText, ListGroup, Button, Form, Jumbotron} from "reactstrap";
import { useHistory } from 'react-router-dom';
import "./BookList.css";
import UserContext from "../UserContext";

function BookList({deleteList}){
    const user = useContext(UserContext);
    const history = useHistory(); 

    const handleSubmitBook = async (book) => {
        history.push(`/book/${book.isbn}`);
    }

    const handleSubmitList = async (id) => {
        await deleteList(id);
        history.push('/booklists');
    }

    return(
        <div>
            <div>
                <Jumbotron>
                    <h1 className="display-3">Book Wishlists</h1>
                    <p className="lead">Check out your booklists and find something fun to read!</p>
                </Jumbotron>
            </div>
            <ListGroup className = "booklists-list">
            {user.booklists.map(list => (
                <div key={list.id}>
                <h3>{list.name}</h3>
                <h5>{list.description}</h5>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitList(list.id)}}>
                    <Button >Delete booklist</Button>
                </Form>
                <br></br>
                {list.books.map(book => (
                <div key={book.isbn}>
                    <Card className = "book-card">
                    <CardBody>
                        <CardTitle className="book-card-title">{book.title}</CardTitle>
                        <CardText>{book.author}</CardText>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmitBook(book);}}>
                            <Button >View Book Details</Button>
                        </Form>
                    </CardBody>
                    </Card>
                    </div>
                ))}
                </div>
            ))}
            </ListGroup>
        </div>
    )
}

export default BookList;


