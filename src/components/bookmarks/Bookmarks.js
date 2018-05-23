import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { startCase } from "lodash";
import { setCategory } from "../App/AppActions";

class Bookmarks extends React.Component {
  componentWillMount() {
    this.checkCategeory(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.checkCategeory(nextProps);
  }
  checkCategeory(props) {
    let params = props.match && props.match.params;
    if (
      props.selectedCategory &&
      params &&
      params.categoryId &&
      Number(props.selectedCategory.id) !== Number(params.categoryId)
    ) {
      props.dispatch(setCategory(Number(params.categoryId)));
    }
  }
  render() {
    let bookmarks = (this.props.selectedCategory ? this.props.selectedCategory.bookmarks : null) || [];
    return (
      <div>
        <h4>Bookmarks: </h4>
        <ul style={{ listStyle: "none" }}>
          {bookmarks.map(bookmark => {
            return (
              <li key={`${bookmark.id}`}>
                <a href={bookmark.url} target="__blank">
                  {startCase(bookmark.name)}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  selectedCategory: state.app.selectedCategory,
  categories: state.app.categories
});
export default withRouter(connect(mapStateToProps)(Bookmarks));
