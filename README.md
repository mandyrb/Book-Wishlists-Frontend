# Book Wishlists - Backend

[Deployed using Surge](https://nostalgic-yard.surge.sh/)

**Book Wishlists** is a web application for creating custom booklists, based on searches of the New York Times Bestsellers lists. This repository includes the frontend for the application; the backend repository can be found [here](https://github.com/mandyrb/book-wishlist-backend). The purpose of this web app is to provide a convenient and efficient way for users to search for popular books and create lists of books they're interested in reading, to reference later when they're ready to read a new book.

**Features and Flow**: A visitor to the site can register as a new user, or login as an existing user. Once the user has logged in, the home view displays a list of ten fiction books from the current New York Times bestsellers list, with the option to click on any book to view book details. If the user prefers to find nonfiction books and/or books with a different list date, they can submit a search form and the home view will update. On the book detail page, a user can see which of their custom lists include the given book, and they can click to add or remove the book from any of their lists. Alternatively, they can create a new custom list for the book. If the user wishes to view their custom lists, they can navigate to "My Lists," where they can click to view book details and/or delete lists that are no longer needed.

**API Information**: The frontend makes requests to the  application backend, which in turn makes requests to the [New York Times Books API](https://developer.nytimes.com/docs/books-product/1/overview). More information about this API and its use on the backend can be found [here](https://github.com/mandyrb/book-wishlist-backend).

**Technology Stack**: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and it uses [Reactstrap](https://reactstrap.github.io/) for styling.

**Project Setup**: If you clone this repository and would like to run the backend locally, follow these steps to get started:

- Install dependencies within the root directory:
     - `npm install`
- Run the app and view at `http://localhost:3000`:
     - `npm start`
