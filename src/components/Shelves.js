import React, { Component } from "react";
import Shelf from "./Shelf";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
class Shelves extends Component {
  render() {
    const allBooks = this.props.AllBooks;
    const changeShelf = this.props.changeShelf;
    ///Categorizing books according to their 3 shelves
    // 1) read books
    const read = allBooks.filter((book) => {
      return book.shelf === "read";
    });
    // 2) Currently Reading books
    const CurrentlyReading = allBooks.filter((book) => {
      return book.shelf === "currentlyReading";
    });
    // 3) Want To Read books
    const wantToread = allBooks.filter((book) => {
      return book.shelf === "wantToRead";
    });
    return (
      <div className="list-books-content">
        <div className="list-books-title">
          <h1> MyReads </h1>
        </div>
        <div>
          {/* shelf Currently Reading */}
          <Shelf
            books={CurrentlyReading}
            ShelfTitle={"Currently Reading"}
            changeShelf={changeShelf}
          />
          {/* shelf Want To Read*/}
          <Shelf
            books={wantToread}
            ShelfTitle={"Want To Read"}
            changeShelf={changeShelf}
          />
          {/* //// */}
          {/* shelf read */}
          <Shelf books={read} ShelfTitle={"Read"} changeShelf={changeShelf} />
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}
Shelves.propTypes = {
  AllBooks: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
};
export default Shelves;
