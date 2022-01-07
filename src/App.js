import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelves from "./components/Shelves";
import Search from "./components/Search";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    AllBooks: [],
  };
  // calling books from Api and updating the state array with resulted books
  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      this.setState({
        AllBooks: Array.from(res),
      });
    });
  }
  // changing the book shelf and making
  changeShelf = (slectedBook, selectedShelf) => {
    BooksAPI.update(slectedBook, selectedShelf).then((resp) => {
      slectedBook.shelf = selectedShelf;
      var newAllbooks = this.state.AllBooks.filter(
        (book) => book.id !== slectedBook.id
      );
      newAllbooks.push(slectedBook);
      this.setState({ AllBooks: newAllbooks });
    });
  };

  render() {
    const AllBooks = this.state.AllBooks;
    return <div className="app">
        {/* Search page   */}
        <Route exact path="/Search" render={() => <Search changeShelf={this.changeShelf} AllBooks={this.state.AllBooks} />} />
        <div className="list-books">
          {/* Main page */}
          <Route exact path="/" render={() => <Shelves AllBooks={AllBooks} changeShelf={this.changeShelf} />} />
        </div>
      </div>;
  }
}

export default BooksApp;
