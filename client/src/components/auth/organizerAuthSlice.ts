import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push, routerMiddleware } from 'connected-react-router';
import { startAppListening } from '../../app/listenerMiddleware';
import type { RootState } from '../../app/type';
import { AppRoutes } from '../../routing/routes';
import {
  club,
  createClubDataType,
  OrganizerLoginRequestPayload,
  OrganizerLoginResponsePayload,
} from '../../boundaries/club-backend/model';
import { createClubAPI, OrganizerLogin } from '../../boundaries/club-backend/api';
import {
  CreateEventRequestPayload,
  CreateEventResponsePayload,
  GetEventPayload,
} from '../../boundaries/event-backend/model';
import { CreateEventApi, getAllEventsAPI } from '../../boundaries/event-backend/api';

export interface ClubState {
  isOrganizerLoggedIn: boolean;
  organizerToken: string;
  club: club;
  events: GetEventPayload[];
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
  events: [],
};

export const OrganizerLoginAsync = createAsyncThunk(
  'club/OrganizerLoginThunk',
  async (payload: OrganizerLoginRequestPayload, thunkApi) => {
    const response = await OrganizerLogin(payload);
    const data = response.data as OrganizerLoginResponsePayload;
    console.log(data);
    window.location.assign(AppRoutes.ORGANIZER_DASHBOARD);
    return data;
  }
);

export const CreateEventAsync = createAsyncThunk(
  'club/CreateEventAsync',
  async (payload: CreateEventRequestPayload, thunkApi) => {
    const response = await CreateEventApi(payload);
    const data = response.data as CreateEventResponsePayload;
    console.log(data);
    window.location.assign(AppRoutes.ORGANIZER_DASHBOARD);
    return data;
  }
);

export const createClubAsync = createAsyncThunk(
  'club/createAsync',
  async (payload: createClubDataType, thunkApi) => {
    const response = await createClubAPI(payload);
    console.log(response);
  }
);

export const GetAllEventsAsync = createAsyncThunk('events/GetAllEventsAsync', async () => {
  const response = await getAllEventsAPI();
  const data = response.data as CreateEventResponsePayload;
  console.log(data);
  return data;
});

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
      state.events = action.payload.events;
      console.log(state.club);
      if (typeof window !== 'undefined') {
        localStorage.setItem('OrganizerToken', action.payload.token);
      }
    });

    builder.addCase(CreateEventAsync.fulfilled, (state, action) => {
      state.events = action.payload.events;
    });

    builder.addCase(GetAllEventsAsync.fulfilled, (state, action) => {
      state.events = action.payload.events;
    });

    builder.addCase(organizerLogout, (state) => {
      state.isOrganizerLoggedIn = false;
      state.organizerToken = '';
      state.club = clubInitialData;
      state.events = [];
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

export const getAllEvents = (state: RootState) => state.club.events;

export default clubSlice.reducer;
