import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./app-reducers.js";


const logger = createLogger({ diff: true });
let middlewares = [logger, reduxThunk];

let composeEnhancers = composeWithDevTools({});

let store;

if (process.env.NODE_ENV === "development") {
  store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middlewares),
  ));
} else {
  store = createStore(reducers, applyMiddleware(...middlewares));
}

export default store;