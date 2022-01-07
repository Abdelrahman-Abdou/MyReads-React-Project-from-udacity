import React, { Component } from "react";
import Book from "./Book";
import PropTypes from "prop-types";
class Shelf extends Component {
  render() {
    //displaying books according to their respected shelves
    const books = this.props.books;
    const changeShelf = this.props.changeShelf;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title"> {this.props.ShelfTitle} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} changeShelf={changeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};
export default Shelf;
