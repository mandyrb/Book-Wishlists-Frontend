import React, {useState, useEffect, useContext} from "react";
import {Card, CardBody, CardTitle, CardText, CardImg, Button, Form, FormGroup, ListGroup, ListGroupItem} from "reactstrap";
import "./Book.css";
import LoadingSpinner from "../LoadingSpinner";
import { useParams, useHistory } from "react-router-dom";
import MyBookListApi from "../api";
import UserContext from "../UserContext";

function Book({removeBook, addBook}){
    const user = useContext(UserContext);
    const history = useHistory(); 
    // const { type, date, isbn } = useParams();
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

    function handleAmazonClick(){
        window.open(`${book.amazonLink}`,'_blank');
    }

    const addBookToList = async function(listId){
        await addBook(isbn, book.title, book.author, bestsellersDate, type, listId, user.username);
        history.push("/");
    }

    const removeBookFromList = async function(listId){
        console.log(listId);
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
            <Card className = "book">
                <CardBody>
                    <CardImg top width="100%" src={book.coverUrl} alt="Card image cap" />
                    <CardTitle className="book-title">{book.title}</CardTitle>
                    <CardText>{book.author}</CardText>
                    <CardText>{book.description}</CardText>
                    <Button onClick={handleAmazonClick}>Check out on Amazon</Button>
                </CardBody>
            </Card>
            <br></br>
            <br></br>
            <Card className = "book">
            <ListGroup>
                {user.booklists.map(list => ( 
                    <div key={list.id}>
                    {booklistIds.includes(list.id)?
                        <ListGroupItem >This book is currently on {list.name}   
                            <Button onClick={() => removeBookFromList(list.id)}>Remove</Button>
                        </ListGroupItem>
                    :
                        <ListGroupItem >This book is not currently on {list.name}   
                            <Button onClick={() => addBookToList(list.id)}>Add</Button>
                        </ListGroupItem>
                    }
                    </div>
                ))}
            </ListGroup>
            </Card>
            <br></br>
            <br></br>
        </div>
    )
}

export default Book;

// Original version where I was thinking it was only on one list
// and used drop down menu for adding

// function Book(){
//     const user = useContext(UserContext);
//     // const { type, date, isbn } = useParams();
//     const { isbn } = useParams();
//     const [book, setBook] = useState(null);
//     const [listId, setListId] = useState(null);
//     let type, bestsellersDate, booklistName;

//     for (let list of user.booklists){
//         for(let book of list.books){
//             if(book.isbn === isbn){
//                 type = book.type;
//                 bestsellersDate = book.bestsellersDate;
//                 booklistName = list.name;
//             }
//         }
//     }

//     function handleAmazonClick(){
//         window.open(`${book.amazonLink}`,'_blank');
//     }

//     const handleAddChange = (e) => {
//         const { value } = e.target;
//         setListId(value);  
//     }

//     const handleAddSubmit = async function(e){
//         e.preventDefault();
//         console.log(listId);
//     }

//     useEffect(() => {
//         async function getBookDetails() {
//             let result = await MyBookListApi.getBook(type, bestsellersDate, isbn, user.username)
//             setBook(result);
//         }
//         getBookDetails();
//         setListId(user.booklists[0].id);
//     }, [isbn]);

//     if (!book) return <LoadingSpinner />

//     return(
//         <div>
//             <Card className = "book">
//                 <CardBody>
//                     <CardImg top width="100%" src={book.coverUrl} alt="Card image cap" />
//                     <CardTitle className="book-title">{book.title}</CardTitle>
//                     <CardText>{book.author}</CardText>
//                     <CardText>{book.description}</CardText>
//                     <CardText>This book is currently on your "{booklistName}" booklist.</CardText>
//                     <Button onClick={handleAmazonClick}>Check out on Amazon</Button>
//                 </CardBody>
//             </Card>
//             <Form onSubmit={handleAddSubmit}>
//             <FormGroup>
//                 <Label for="listSelect">Select a list and add this book:</Label>
//                 <Input type="select" name="select" id="listSelect" onChange={handleAddChange}>
//                 {user.booklists.map(list => (
//                     <option key={list.id} value={list.id}>{list.name}</option>
//                 ))}
//                 </Input>
//                 <Button>Add</Button>
//             </FormGroup>
//             </Form>
//         </div>
//     )
// }
