import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { middleware as routesMiddleware, enhancer as routesEnhancer } from 'state/routes'
import rootReducer from 'state/rootReducer';
import rootSaga from "state/sagas";

/*const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result
};*/

const sagasMiddleware = createSagaMiddleware();
const composeMiddlewares = applyMiddleware(routesMiddleware, sagasMiddleware);


// Use Redux DevTools Extension if available and not in production.
const composeEnhancers = ((process.env.NODE_ENV !== 'production') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(routesEnhancer, composeMiddlewares)
);

sagasMiddleware.run(rootSaga);