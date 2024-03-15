import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { LIMIT_STORED_DATA } from '../../config/config';

export const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    date: []
  },
  reducers: {
    updateTagData: (state, action) => {
      action.payload.forEach((tag) => {
        try {
          if (!state[tag.assetId]) {
            state[tag.assetId] = [];
          }

          const currentDate = moment(new Date(tag.timeStamp)).format('YYYY-MM-DD HH:mm:ss');
          const executionId = tag.execId;

          if (Number.isFinite(tag.value)) { // Verifica si tag.value es un número
            state[tag.assetId].push([currentDate, tag.value,executionId]);
            state.date.push(currentDate);
            if (state[tag.assetId].length > LIMIT_STORED_DATA) {
              state[tag.assetId].shift();
              state.date.shift();
            }
          }
        } catch (err) {
          console.err(err);
        }
      });

      if (state.date.length > LIMIT_STORED_DATA) {
        state.date.shift();
      }
    }
  }
});

export const { updateTagData } = tagSlice.actions;

export const tagReducer = tagSlice.reducer;
