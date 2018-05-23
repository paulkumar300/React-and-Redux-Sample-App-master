import Axios from "axios";
import { BOOKMARK_SAVE } from "../../constants/ApiConstants";
import { push } from "react-router-redux";
export const SET_BOOKMARK = "SET_BOOKMARK";

export const saveBookmark = bookmark => {
  return (dispatch, getState) => {
    return Axios.post(BOOKMARK_SAVE, bookmark)
      .then(res => {
        dispatch({ type: SET_BOOKMARK, bookmark: res.data });
        dispatch(push({ pathname: `/category/${res.data.categoryId}` }));
      })
      .catch(error => {
        console.log("handle Error", error);
      });
  };
};
