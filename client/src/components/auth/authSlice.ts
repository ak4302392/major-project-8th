import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { startAppListening } from '../../app/listenerMiddleware';
import type { RootState } from '../../app/type';
import {
  login,
  googleLogin,
  register,
  verifyEmailOtpAPI,
} from '../../boundaries/ad-lnx-backend/auth/api';
import { AppRoutes } from '../../routing/routes';
import {
  GoogleLoginRequest,
  LoginRequestPayload,
  LoginResponsePayload,
  RegisterRequestPayload,
  UserData,
} from '../../boundaries/ad-lnx-backend/auth/model';
import { getEventById, registerToEvent } from '../../boundaries/event-backend/api';
import { GetEventPayload } from '../../boundaries/event-backend/model';
// import { AppRoutes } from '../../routing/routes';

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  error: string | null;
  registeredEvents: GetEventPayload[];
  user: UserData;
}

const initialState: AuthState = {
  isLoggedIn:
    typeof window !== 'undefined' ? (localStorage.getItem('token') ? true : false) : false,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '',
  error: null,
  user: {
    name: '',
    email: '',
    phone: '',
    isManitStudent: false,
    scholarNumber: '',
    eventsRegistered: [],
    id: '',
  },
  registeredEvents: [],
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
      const userId = response?.data?.userId;
      // const data = response.data as LoginResponsePayload;
      window.location.assign(`${AppRoutes.OTP_VERIFICATION}?userId=${userId}`);
      // return data;
    } catch (err: any) {
      throw err;
    }
  }
);

//email otp verification
export const emailOtpVerificationAsync = createAsyncThunk(
  'auth/emailOtpVerificationAsync',
  async (payload: { userId: string; otp: string }, thunkApi) => {
    try {
      const response = await verifyEmailOtpAPI(payload);
      // const data = response.data as LoginResponsePayload;
      window.location.assign(AppRoutes.LOGIN);
      // return data;
    } catch (err: any) {
      throw err;
    }
  }
);

export const getAllRegisteredEventsAsync = createAsyncThunk(
  'auth/getAllRegisteredEventsAsync',
  async (
    payload: {
      eventsArray: string[];
    },
    thunkApi
  ) => {
    try {
      const events = [];
      for (const id of payload.eventsArray) {
        const response = await getEventById({ id });
        const data = response.data.event;
        events.push(data);
      }
      // return events;
      // const response = await registerToEvent(payload);
      // const data = response;
      // window.location.assign(AppRoutes.DEFAULT);
      return events;
    } catch (err: any) {
      throw err;
    }
  }
);

export const registerEventAsync = createAsyncThunk(
  'auth/registerEventAsync',
  async (
    payload: {
      userId: string;
      eventId: string;
    },
    thunkApi
  ) => {
    try {
      const response = await registerToEvent(payload);
      const data = response.data;
      // window.location.assign(AppRoutes.DEFAULT);
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
      state.user = action.payload.user;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
    });
    builder.addCase(googleLoginAsync.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    });
    // builder.addCase(registerAsync.fulfilled, (state, action) => {
    //   state.isLoggedIn = true;
    //   // this is optional if you are returning token after registration
    //   state.token = action.payload.token;
    //   if (typeof window !== 'undefined') {
    //     localStorage.setItem('token', action.payload.token);
    //   }
    // });
    builder.addCase(registerEventAsync.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(getAllRegisteredEventsAsync.fulfilled, (state, action) => {
      state.registeredEvents = action.payload;
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

export const getUser = (state: RootState) => state.auth.user;

export const getRegisteredEvents = (state: RootState) => state.auth.registeredEvents;

export default authSlice.reducer;
