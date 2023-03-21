import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import store from './state';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
