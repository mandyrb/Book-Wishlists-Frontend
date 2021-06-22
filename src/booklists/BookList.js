import React, {useContext} from "react";
import {Card, CardBody, CardTitle, CardText, Container, Row, Col, Button, Form, Jumbotron} from "reactstrap";
import { useHistory } from 'react-router-dom';
import "./BookList.css";
import UserContext from "../UserContext";

function BookList({deleteList}){
    const user = useContext(UserContext);
    const history = useHistory(); 

    // Direct user to view book detail page

    const handleSubmitBook = async (book) => {
        history.push(`/book/${book.isbn}`);
    }

    // Allow user to delete a booklist

    const handleSubmitList = async (id) => {
        await deleteList(id);
        history.push('/booklists');
    }

    return(
        <div>
            <div>
                <Jumbotron className="booklist-jumbotron">
                    <h1 className="display-3">Book Wishlists</h1>
                    <br></br>
                    <p className="lead">Below you'll find a list of all the booklists you've created,
                        with a link to each book on that list. You can click on any book to view its details,
                        or to add or remove it from one of your lists. You can also delete a booklist, which 
                        will automatically remove all books from that list.</p>
                </Jumbotron>
            </div>
            <Container >
            <Row xs="1" sm="2">
            {user.booklists.map(list => (
                <div key={list.id}>
                <br></br>
                <h3>{list.name}</h3>
                <h5>{list.description}</h5>
                <br></br>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitList(list.id)}}>
                    <Button >Delete booklist</Button>
                </Form>
                <br></br>
                <Container >
                <Row xs="1" md="2">
                {list.books.map(book => (
                    <Col key={book.isbn}>
                    <div key={book.isbn}>
                    <Card className = "book-card" >
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
                    </Col>
                ))}
                </Row>
                </Container>
                </div>

            ))}
            </Row>
            </Container>
        </div>
    )
}

export default BookList;


