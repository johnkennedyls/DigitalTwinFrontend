import { createSelector, createSlice } from '@reduxjs/toolkit';

export const processSlice = createSlice({
  name: 'processes',
  initialState: {
    processes: []
  },
  reducers: {
    loadProcessesByPlant: (state, action) => {
      state.processes = action.payload;
    },
    deleteProcess: (state, action) => {
      delete state[action.payload];
    }
  }
});

export const { loadProcessesByPlant, deleteProcess } = processSlice.actions;

export const processReducer = processSlice.reducer;
