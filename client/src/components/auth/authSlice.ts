import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push, routerMiddleware } from 'connected-react-router';
import { startAppListening } from '../../app/listenerMiddleware';
import type { RootState } from '../../app/type';
import { login, googleLogin, register } from '../../boundaries/ad-lnx-backend/auth/api';
import { AppRoutes } from '../../routing/routes';
import {
  GoogleLoginRequest,
  LoginRequestPayload,
  LoginResponsePayload,
  RegisterRequestPayload,
} from '../../boundaries/ad-lnx-backend/auth/model';
import { Dispatch, SetStateAction } from 'react';
// import { AppRoutes } from '../../routing/routes';

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn:
    typeof window !== 'undefined' ? (localStorage.getItem('token') ? true : false) : false,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '',
  error: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const loginAsync = createAsyncThunk(
  'auth/loginThunk',
  async (payload: LoginRequestPayload, thunkApi) => {
    const response = await login(payload);
    const data = response.data as LoginResponsePayload;
    window.location.assign(AppRoutes.DEFAULT);
    return data;
  }
);

export const googleLoginAsync = createAsyncThunk(
  'auth/googleLoginThunk',
  async (payload: GoogleLoginRequest, thunkApi) => {
    const response = await googleLogin(payload);
    window.location.assign(AppRoutes.DEFAULT);
    const data = response.data as LoginResponsePayload;
    return data;
  }
);

// Define the async thunk for registration
export const registerAsync = createAsyncThunk(
  'auth/registerThunk',
  async (payload: RegisterRequestPayload, thunkApi) => {
    try {
      const response = await register(payload);
      const data = response.data as LoginResponsePayload;
      window.location.assign(AppRoutes.DEFAULT);
      return data;
    } catch (err: any) {
      throw err;
    }
  }
);

export const logout = createAction('auth/logout');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
    });
    builder.addCase(googleLoginAsync.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      // this is optional if you are returning token after registration
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
    });
    builder.addCase(logout, (state) => {
      state.isLoggedIn = false;
      state.token = '';
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    });
    // builder.addDefaultCase((state, action) => {
    //   // Load state from localStorage
    //   const storedState = loadState();
    //   if (storedState) {
    //     return storedState;
    //   }
    //   return state;
    // });
  },
});

startAppListening({
  actionCreator: loginAsync.fulfilled,
  effect: (action, listenerApi) => {
    if (listenerApi.getState().auth.isLoggedIn === true) {
      listenerApi.dispatch(push('/'));
    }
  },
});

startAppListening({
  actionCreator: googleLoginAsync.fulfilled,
  effect: (action, listenerApi) => {
    if (listenerApi.getState().auth.isLoggedIn === true) {
      listenerApi.dispatch(push('/'));
    }
  },
});

// startAppListening({
//   actionCreator: registerAsync.fulfilled,
//   effect: (action, listenerApi) => {
//     if (listenerApi.getState().auth.isLoggedIn === true) {
//       listenerApi.dispatch(push(AppRoutes.DASHBOARD));
//     }
//   },
// });

export const { reset } = authSlice.actions;

export const isUserAuthenticated = (state: RootState) => state.auth.isLoggedIn;

export const getToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
