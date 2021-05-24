import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'], // or blacklist to exclude specific reducers
};
const presistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  presistedReducer,
  composeWithDevTools(applyMiddleware(logger, thunk)),
);
const persistor = persistStore(store);
export { persistor, store };
