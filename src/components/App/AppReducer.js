import { SET_BOOKMARK_CATEGORY, SET_CATEGORIES, SET_CATEGORY } from "./AppActions";
import { cloneDeep } from "lodash";
import { SET_BOOKMARK } from "../bookmarks/BookmarksAction";

const initialState = {
  categories: [],
  selectedCategory: null
};

export function appReducer(state = cloneDeep(initialState), action) {
  switch (action.type) {
    case SET_CATEGORIES: {
      let newState = cloneDeep(state);
      let { categories } = action;

      newState.categories = categories;
      if (Array.isArray(categories) && categories.length) newState.selectedCategory = categories[0];

      return newState;
    }
    case SET_BOOKMARK_CATEGORY: {
      let newState = cloneDeep(state);

      newState.selectedCategory = newState.categories.find(c => Number(c.id) === Number(action.category));

      return newState;
    }
    case SET_BOOKMARK: {
      let newState = cloneDeep(state);
      let { bookmark } = action;

      let categoryIndex = newState.categories.findIndex(c => Number(c.id) === Number(bookmark.categoryId));

      if (categoryIndex >= 0) {
        let catBookmarks = newState.categories[categoryIndex].bookmarks;
        if (catBookmarks) catBookmarks.push(bookmark);
        else newState.categories[categoryIndex].bookmarks = [bookmark];
      }

      return newState;
    }
    case SET_CATEGORY: {
      let newState = cloneDeep(state);
      let { category } = action;

      newState.categories.push(category);

      return newState;
    }
    default:
      return state;
  }
}
