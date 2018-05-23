import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { appReducer } from "../components/App/AppReducer";
const rootReducer = combineReducers({
  routing: routerReducer,
  app: appReducer
});

export default rootReducer;
