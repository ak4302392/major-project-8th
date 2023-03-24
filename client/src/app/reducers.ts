/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// import dashboardReducer from '../components/dashboard/dashboardSlice';
import authReducer from '../components/auth/authSlice';
import clubReducer from '../components/auth/organizerAuthSlice';
// import adminReducer from '../components/dashboard/admin/adminSlice';
import coreReducer from '../components/core/coreSlice';

import history from './history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'club'],
};

const createReducer = (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    // dashboard: dashboardReducer,
    auth: authReducer,
    club: clubReducer,
    // admin: adminReducer,
    core: coreReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return persistedReducer;
};

export default createReducer;
