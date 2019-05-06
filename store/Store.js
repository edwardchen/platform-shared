import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  undefined,
  compose(
    applyMiddleware(thunk)
  )
);

const persistor = persistStore(store);
persistor.purge();
export { store, persistor };
