import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import rootReducer from './root-reducer';

export const customHistory = createBrowserHistory();

const middleware = [ReduxThunk.withExtraArgument({ history: customHistory })];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middleware.push(logger);
}

export default createStore(rootReducer, applyMiddleware(...middleware));
