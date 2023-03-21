import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/type';

export interface CoreState {
  isLoading: boolean;
  status: 'success' | 'failure';
  message: string;
}

const initialState: CoreState = {
  isLoading: false,
  status: 'success',
  message: '',
};

export interface SetIsLoadingPayload {
  isLoading: boolean;
}

export interface SetResponseInfoPayload {
  status: 'success' | 'failure';
  message: string;
}

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    reset: () => initialState,
    setIsLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
      state.isLoading = action.payload.isLoading;
    },
    setResponseInfo: (state, action: PayloadAction<SetResponseInfoPayload>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
  },
});

export const { reset, setIsLoading, setResponseInfo } = coreSlice.actions;

export const isLoading = (state: RootState) => state.core.isLoading;

export const getStatus = (state: RootState) => state.core.status;

export const getMessage = (state: RootState) => state.core.message;

export default coreSlice.reducer;
