import React, { Component } from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getBookmarks, setCategory, saveCategory } from "./AppActions";
import "./App.css";
import Bookmarks from "../bookmarks/Bookmarks";
import AddBookmark from "../bookmarks/AddBookmark";
import { Sidebar } from "./Sidebar";

class App extends Component {
  state = {
    name: ""
  };
  componentDidMount() {
    this.props.dispatch(getBookmarks());
  }
  setCategory = category => {
    this.props.dispatch(setCategory(category));
  };
  handleChange = e => {
    this.setState({ name: e.target.value });
  };
  saveCategory = e => {
    e.preventDefault();
    this.state.name && this.props.dispatch(saveCategory({ name: this.state.name }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              Bookmarkly
            </Link>

            <div className="collapse navbar-collapse offset-1" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                  <Link className="nav-link" to="/bookmark">
                    Add Bookmark
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="container-fluid">
          <div className="row">
            <Sidebar
              {...this.props}
              setCategory={this.setCategory}
              handleChange={this.handleChange}
              saveCategory={this.saveCategory}
              name={this.state.name}
            />
            <div className="col-md-6 p-4">
              <Switch>
                <Route exact path="/" component={Bookmarks} />
                <Route path="/bookmark" component={AddBookmark} />
                <Route path="/category/:categoryId" component={Bookmarks} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  categories: state.app.categories,
  selectedCategory: state.app.selectedCategory
});
export default withRouter(connect(mapStateToProps)(App));
