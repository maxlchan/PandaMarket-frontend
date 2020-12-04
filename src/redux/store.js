import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from './root-reducer';
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();
const middleware = [ReduxThunk.withExtraArgument({ history: customHistory })];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middleware.push(logger);
}

export default createStore(rootReducer, applyMiddleware(...middleware));
