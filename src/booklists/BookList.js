import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, CardTitle, CardText, ListGroup, Button, Form} from "reactstrap";
// import LoadingSpinner from "../LoadingSpinner";
import { useHistory } from 'react-router-dom';
import "./BookList.css";
import UserContext from "../UserContext";

function BookList(){
    const user = useContext(UserContext);
    const history = useHistory(); 

    // async function getCompaniesWithSearch(searchTerm) {
    //     let result = await JoblyApi.getCompaniesSearch(searchTerm);
    //     setCompanies(result);
    //     return result.length;
    // }

    // const handleSubmit = async (book) => {
    //     history.push(`/book/${book.type}/${book.bestsellersDate}/${book.isbn}`);
    // }

    const handleSubmit = async (book) => {
        history.push(`/book/${book.isbn}`);
    }

    return(
        <div>
            {/* <CompanySearchForm search={getCompaniesWithSearch}/> */}
            <ListGroup className = "booklists-list">
            {user.booklists.map(list => (
                <div key={list.id}>
                <h3>{list.name}</h3>
                <h5>{list.description}</h5>
                {list.books.map(book => (
                <div key={book.isbn}>
                    <Card className = "book-card">
                    <CardBody>
                        <CardTitle className="book-card-title">{book.title}</CardTitle>
                        <CardText>{book.author}</CardText>
                        <Form onSubmit={() => handleSubmit(book)}>
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


