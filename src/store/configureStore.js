import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';

// const middleware = [];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
  debounce: 500,
};

const persistedReducers = persistReducer(persistConfig, reducers);

export default function configureStore(cb) {
  const store = createStore(
    persistedReducers,
  );
  const persistor = persistStore(store, null, cb);

  return { store, persistor };
}
