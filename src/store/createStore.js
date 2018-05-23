import { routerMiddleware } from "react-router-redux";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

export function configureStore(history) {
  const routingMiddleware = routerMiddleware(history);

  let middlewares = [routingMiddleware, thunk];

  const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
  return createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middlewares)));
}
