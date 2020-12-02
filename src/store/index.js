import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducers from "../reducers/index";

const middleware = [];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

export default createStore(reducers, applyMiddleware(...middleware));
