import { createSlice } from '@reduxjs/toolkit'
import { LIMIT_STORED_DATA } from '../../config/config'
import moment from 'moment';

export const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    date: []
  },
  reducers: {
    updateTagData: (state, action) => {
      action.payload.forEach((tag) => {

        if (!state[tag.assetId]) {
          state[tag.assetId] = [];
        }

        state[tag.assetId].push(tag.value)
        if (state[tag.assetId].length > LIMIT_STORED_DATA) {
          state[tag.assetId].shift()
        }
      });
      
      if(state.date.length > LIMIT_STORED_DATA) {
        state.date.shift()
      }
      state.date.push(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
    }
  },
})

export const { updateTagData } = tagSlice.actions

export const tagReducer = tagSlice.reducer