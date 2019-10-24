import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers.js';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
const sagamiddleware = createSagaMiddleware();
//import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

//const enhancers = process.env.NODE_ENV === 'production' ? [thunk] : [thunk,createLogger];
const enhancers = process.env.NODE_ENV === 'production' ? [sagamiddleware] : [sagamiddleware,createLogger];

let store = createStore(rootReducer, applyMiddleware(...enhancers));

sagamiddleware.run(rootSaga);

export default store;