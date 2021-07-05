import React, {useContext} from "react";
import {Card, CardBody, CardTitle, CardText, Container, Row, Col, Button, Form, Jumbotron} from "reactstrap";
import { useHistory } from 'react-router-dom';
import NewBooklistForm from "./NewBooklistForm";
import "./BookList.css";
import UserContext from "../UserContext";

function BookList({addList, deleteList}){
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
                        or to add or remove it from one of your lists. You can also create a new list, which you can
                        add books to in the future. If you no longer need a list you can delete it, which 
                        will automatically remove all books from that list.</p>
                </Jumbotron>
            </div>
            <br></br>
            <br></br>
            <Card className="new-booklist-form">
            <br></br>
            <h3 style={{color:"black", margin:"10px"}}>Create a new list:</h3>
            <br></br>
            <NewBooklistForm addList={addList}></NewBooklistForm>
            </Card>
            <br></br>
            <Container >
            {user.booklists.map(list => (
                <div key={list.id}>
                <br></br>
                <div className="d-flex flex-row">
                <h3>{list.name}</h3>
                </div>
                <div className="d-flex flex-row">
                <h5>{list.description}</h5>
                </div>
                <br></br>
                <div className="d-flex flex-row">
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitList(list.id)}}>
                    <Button >Delete booklist</Button>
                </Form>
                </div>
                <br></br>
                <div className="d-flex flex-row">
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    history.push('/');}}>
                    <Button >Find Books to Add</Button>
                </Form>
                </div>
                <br></br>
                <Container >
                <Row xs="1" sm="2" lg="3">
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
            </Container>
        </div>
    )
}

export default BookList;


