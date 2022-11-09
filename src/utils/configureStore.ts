/**
 * Create the store with dynamic reducers
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';

/**
 * Create a store
 *
 * @param {object} state - initial state
 * @param {ConfigureStoreOptions} options - Create store options
 * @return {any} store
 */
export default function configureStore (state: any, options: any) {
  let composeEnhancers:any = compose
  const reduxSagaMonitorOptions = {}
  const initialState = {
    ...state
  }

  const opts = {
    ...options
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  const middlewares = [sagaMiddleware, routerMiddleware(opts.history)]
  const enhancers = [applyMiddleware(...middlewares)]

  const store:any = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  )

  //
  // Extensions
  //
  store.runSaga = sagaMiddleware.run
  store.injectedReducers = {}
  store.injectedSagas = {}

  /* istanbul ignore next */
  if (opts.appModule && opts.appModule.hot) {
    opts.appModule.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  return store
};
