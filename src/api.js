import axios from "axios";

const BASE_URL = "https://book-wishlists.herokuapp.com";

// API Class - Static class tying together methods used to get/send to to the API.

class MyBooklistApi {
  // the token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `${MyBooklistApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

    /** Get a list of books from the NYT bestsellers API  */

  static async bookSearch(type, date, username) {
    let res = await this.request(`booklists/${type}/${date}/${username}`);
    return res.books;
  }

  /** Get details on a book  */

  static async getBook(type, date, isbn, username) {
    let res = await this.request(`books/${type}/${date}/${isbn}/${username}`);
    return res.bookDetails;
  }

  /** Add book to an existing booklist  */

  static async addBookToList(isbn, title, author, bestsellersDate, type, booklistId, username) {
    let bookData = {isbn:isbn, title:title, author:author, bestsellersDate:bestsellersDate, type:type}
    let res = await this.request(`books/${username}/${booklistId}`, bookData, "post");
    return res.book;
  }

  /** Create a new booklist  */

  static async addBooklist(name, description, username) {
    let res = await this.request(`booklists/${username}`, {name:name, description:description}, "post");
    return res.booklist;
  }

  /** Delete a booklist  */

  static async deleteBooklist(id, username) {
    let res = await this.request(`booklists/${username}/${id}`, {id:id}, "delete");
    return res.deleted;
  }

  /** Remove book from a booklist  */
  static async removeBookFromList(username, booklistId, isbn) {
    let res = await this.request(`books/${username}/${booklistId}`, {isbn:isbn}, "delete");
    return res.deleted;
  }

  /** Login*/
  static async login(username, password) {
    let res = await this.request("auth/login", {username:username, password:password}, "post");
    return res.token;
  }

  /** Sign up*/
  static async signup(username, password, firstName) {
    let res = await this.request("auth/register", {username:username, password:password, firstName:firstName}, "post");
    return res.token;
  }

  /** Get current user*/
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

}

export default MyBooklistApi;



