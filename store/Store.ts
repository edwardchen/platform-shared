import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createRavenMiddleware from "raven-for-redux";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import Raven from 'utils/raven';
import rootSaga from '../sagas';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};


const persistedReducer = persistReducer(persistConfig, reducers)

const sagaMiddleware = createSagaMiddleware();


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  // persistedReducer,
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(createRavenMiddleware(Raven), sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
