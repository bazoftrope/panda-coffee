/* import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {reducers} from './reducers';
import thunkMiddleware from 'redux-thunk';

const composeEnchancer =
  process.env.Node_ENV === 'production'
    ? applyMiddleware(thunkMiddleware)
    : composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(reducers, composeEnchancer);
 */

import {createStore} from 'redux';
import {reducers} from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['USER_LOG', 'ADD_TO_CART', 'REMOVE_FROM_CART']
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default createStore(reducers);

