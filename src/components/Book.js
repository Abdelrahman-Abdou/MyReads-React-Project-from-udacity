import React, { Component } from "react";
import PropTypes from "prop-types";
class Book extends Component {
  render() {
    const book = this.props.book;
    const changeShelf = this.props.changeShelf;
    return <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, //handling books with no thumbnil
              backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : `url(${"No image Available"})` }} />
          <div className="book-shelf-changer">
            <select value={book.shelf ? book.shelf : "none"} onChange={(e) => {
                changeShelf(book, e.target.value);
              }}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading"> Currently Reading </option>
              <option value="wantToRead"> Want to Read </option>
              <option value="read"> Read </option>
              <option value="none"> None </option>
            </select>
          </div>
        </div>
        <div className="book-title"> {book.title} </div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
      </div>;
  }
}
Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired,
};
export default Book;
