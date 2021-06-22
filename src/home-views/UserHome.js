import React, {useContext, useEffect} from "react";
import {Jumbotron, Card, CardBody, CardTitle, CardText, Form, Button, Container, Row, Col} from "reactstrap";
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
                <Jumbotron className="home-jumbotron">
                    <h1 className="display-3">Book Wishlists</h1>
                    <br></br>
                    <h4>Welcome {user.firstName}!</h4>
                    <br></br>
                    <h4>Time to find some great books!</h4>
                    <br></br>
                    <p className="lead">Below, you'll find ten fiction books from the current 
                        New York Times bestsellers list. You can click on any book to view details about that book,
                        and then you'll have the option to create a list for it, or to add or remove it from one of your existing lists. 
                        If you'd like to search for more books, you can use the search form below, which goes back to 
                        March of 2011. The search will default to fiction, or you can select fiction or nonfiction. 
                        All data is provided by The New York Times.</p>
                    <BookSearchForm getBooksWithSearch={getBooksWithSearch}/>
                </Jumbotron>
                </div>
                <br></br>
                <Container >
                <Row xs="2" md="4">
                    {books.map(book => (
                    <Col key={book.isbn}>
                    <div>
                        <Card className = "book-card">
                        <CardBody>
                            <CardTitle className="book-card-title">{book.title}</CardTitle>
                            <CardText>{book.author}</CardText>
                            <Form  onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit(book);}}>
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
        )
}

export default UserHome;

