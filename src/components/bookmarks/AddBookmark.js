import React from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import { withRouter } from "react-router-dom";
import { saveBookmark } from "./BookmarksAction";
const emptyBookmark = {
  name: "",
  url: "",
  categoryId: ""
};
class AddBookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark: emptyBookmark
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveBookmark = this.saveBookmark.bind(this);
  }
  handleChange(event) {
    let bookmark = cloneDeep(this.state.bookmark);
    bookmark[event.target.name] = event.target.value;
    this.setState({ bookmark });
  }
  validate() {
    let { bookmark } = this.state;
    return bookmark.name && bookmark.url && bookmark.categoryId;
  }
  saveBookmark(e) {
    e.preventDefault();
    if (this.validate()) {
      let data = this.state.bookmark;
      data.categoryId = +data.categoryId;
      this.props.dispatch(saveBookmark(data));
    }
  }
  render() {
    let { bookmark } = this.state;
    return (
      <form>
        <div className="form-group">
          <label htmlFor="name">Bookmark Title</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Bookmark Title"
            defaultValue={bookmark.name}
            onBlur={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Bookmark Category</label>
          <select className="form-control" name="categoryId" onChange={this.handleChange}>
            <option>Select Category</option>
            {(this.props.categories || []).map(c => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="url">Bookmark Url</label>
          <input
            type="text"
            name="url"
            className="form-control"
            placeholder="Bookmark Url"
            defaultValue={bookmark.url}
            onBlur={this.handleChange}
          />
        </div>
        <div className="form-group">
          <button className={`btn btn-primary ${this.validate() ? "" : "disabled"}`} onClick={this.saveBookmark}>
            Add Bookmark
          </button>
        </div>
      </form>
    );
  }
}

export const mapStateToProps = state => ({
  categories: state.app.categories
});
export default withRouter(connect(mapStateToProps)(AddBookmark));
