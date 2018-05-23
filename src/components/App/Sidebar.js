import React from "react";
import { Link } from "react-router-dom";
import { startCase } from "lodash";

export const Sidebar = props => {
  return (
    <nav className="col-md-2 d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          Categories
        </h5>
        <ul className="nav flex-column">
          {props.categories.map((category, id) => {
            return (
              <li
                key={`cat-${category.id}`}
                className={`nav-item bookmark-item ${category.id === props.selectedCategory.id ? "active" : ""}`}
                onClick={() => props.setCategory(category.id)}>
                <Link className="nav-link bookmark-item" to={`/category/${category.id}`}>
                  {startCase(category.name)}
                </Link>
              </li>
            );
          })}
        </ul>
        <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          New Category
        </h5>
        <form className="form-inline">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="category Name"
              onChange={props.handleChange}
              value={props.name}
            />
          </div>
          <div className="input-group m-2 px-3">
            <button className="btn btn-primary" onClick={props.saveCategory}>
              Add Category
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};
