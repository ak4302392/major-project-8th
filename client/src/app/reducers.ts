/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// import dashboardReducer from '../components/dashboard/dashboardSlice';
// import authReducer from '../components/auth/authSlice';
// import adminReducer from '../components/dashboard/admin/adminSlice';
import coreReducer from '../components/core/coreSlice';

import history from './history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

const createReducer = (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    // dashboard: dashboardReducer,
    // auth: authReducer,
    // admin: adminReducer,
    core: coreReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
};

export default createReducer;
