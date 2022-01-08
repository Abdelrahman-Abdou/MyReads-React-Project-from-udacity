import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
class Search extends Component {
  state = {
    query: "",
    SearchResult: [],
  };
  // validating the event before updating the state query and calling the API
  SearchBooks = (query) => {
    if (query.length > 0) {
      this.setState(() => ({
        query: query,
      }));
    } else {
      this.setState({ query: "" });
    }
    if (query.length > 0) {
      BooksAPI.search(query.trim()).then((res) => {
        //Validating the API response before updating the state
        if (!res.error) {
          const commoBooks = this.props.AllBooks.filter((o) =>
            res.some(({ id, title }) => o.id === id && o.title === title)
          );
          for (const book of commoBooks) {
            res.map((b) =>
              b.id === book.id ? (b.shelf = book.shelf) : "none"
            );
          }
          this.setState({ SearchResult: res });
        } else {
          this.setState({ SearchResult: [] });
        }
      });
    } else {
      window.location.reload();
    }
  };

  render() {
    const changeShelf = this.props.changeShelf;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search"> Close </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              autoFocus
              onChange={(event) => {
                this.SearchBooks(event.target.value);
              }}
            />
          </div>
        </div>
        {this.state.SearchResult !== [] && (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.SearchResult.map((book) => (
                <li key={book.id}>
                  <Book book={book} changeShelf={changeShelf} />
                </li>
              ))}
            </ol>
          </div>
        )}
        {/* In case of invalid search words this section will appear */}
        {this.state.SearchResult === [] && (
          <div>
            <br />
            <br />
            <h2>Please, enter on of those search word</h2>
            <p>
              'Android', 'Art', 'Artificial Intelligence', 'Astronomy',
              'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography',
              'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics',
              'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design',
              'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas',
              'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First',
              'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer',
              'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri',
              'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage',
              'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting',
              'Philosophy', 'Photography', 'Poetry', 'Production',
              'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling',
              'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming',
              'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual
              Reality', 'Web Development', 'iOS'
            </p>
          </div>
        )}
      </div>
    );
  }
}
export default Search;
