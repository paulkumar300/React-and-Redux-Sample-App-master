import Axios from "axios";
import { BOOKMARK_CAT_GET_ALL, CATEGORY_SAVE } from "../../constants/ApiConstants";
export const SET_BOOKMARK_CATEGORY = "SET_BOOKMARK_CATEGORY";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_CATEGORY = "SET_CATEGORY";

export const setCategory = category => {
  return (dispatch, getState) => {
    dispatch({ type: SET_BOOKMARK_CATEGORY, category });
  };
};
export const getBookmarks = () => {
  return (dispatch, getState) => {
    return Axios.get(BOOKMARK_CAT_GET_ALL)
      .then(res => {
        dispatch({ type: SET_CATEGORIES, categories: res.data });
      })
      .catch(err => {
        console.log("handle error", err);
      });
  };
};

export const saveCategory = category => {
  return (dispatch, getState) => {
    return Axios.post(CATEGORY_SAVE, category)
      .then(res => {
        const category = Object.assign({}, res.data, { bookmarks: [] });
        dispatch({ type: SET_CATEGORY, category: category });
      })
      .catch(err => {
        console.log("handle error", err);
      });
  };
};
