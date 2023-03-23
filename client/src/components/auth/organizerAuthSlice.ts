import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push, routerMiddleware } from 'connected-react-router';
import { startAppListening } from '../../app/listenerMiddleware';
import type { RootState } from '../../app/type';
import { AppRoutes } from '../../routing/routes';
import { Dispatch, SetStateAction } from 'react';
import {
  club,
  OrganizerLoginRequestPayload,
  OrganizerLoginResponsePayload,
} from '../../boundaries/club-backend/model';
import { OrganizerLogin } from '../../boundaries/club-backend/api';
// import { AppRoutes } from '../../routing/routes';

export interface ClubState {
  isOrganizerLoggedIn: boolean;
  organizerToken: string;
  club: club;
}

const clubInitialData: club = {
  clubId: '',
  name: '',
  desc: '',
  images: [],
  industryType: '',
  upcomingEvents: [],
  cordinatorName: '',
  memories: [],
};

const initialState: ClubState = {
  isOrganizerLoggedIn:
    typeof window !== 'undefined' ? (localStorage.getItem('OrganizerToken') ? true : false) : false,
  organizerToken: typeof window !== 'undefined' ? localStorage.getItem('OrganizerToken') || '' : '',
  club: clubInitialData,
};

export const OrganizerLoginAsync = createAsyncThunk(
  'club/OrganizerLoginThunk',
  async (payload: OrganizerLoginRequestPayload, thunkApi) => {
    const response = await OrganizerLogin(payload);
    const data = response.data as OrganizerLoginResponsePayload;
    console.log(data);
    window.location.assign(AppRoutes.DEFAULT);
    return data;
  }
);
export const organizerLogout = createAction('club/logout');

export const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(OrganizerLoginAsync.fulfilled, (state, action) => {
      state.isOrganizerLoggedIn = true;
      state.organizerToken = action.payload.token;
      console.log(action.payload.club);
      state.club = action.payload.club;
      console.log(state.club);
      if (typeof window !== 'undefined') {
        localStorage.setItem('OrganizerToken', action.payload.token);
      }
    });
    builder.addCase(organizerLogout, (state) => {
      state.isOrganizerLoggedIn = false;
      state.organizerToken = '';
      state.club = clubInitialData;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('OrganizerToken');
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
  actionCreator: OrganizerLoginAsync.fulfilled,
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

export const { reset } = clubSlice.actions;

export const isOrganizerAuthenticated = (state: RootState) => state.club.isOrganizerLoggedIn;

export const getOrganizerToken = (state: RootState) => state.club.organizerToken;

export const getClub = (state: RootState) => state.club.club;

export default clubSlice.reducer;
