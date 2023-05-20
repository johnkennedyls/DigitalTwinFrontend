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

        const currentDate = moment(new Date(tag.timeStamp)).format('YYYY-MM-DD HH:mm:ss')
        state[tag.assetId].push([currentDate,tag.value])
        state.date.push(currentDate)
        if (state[tag.assetId].length > LIMIT_STORED_DATA) {
          state[tag.assetId].shift()
          state.date.shift()
        }
      });
      
      if(state.date.length > LIMIT_STORED_DATA) {
        state.date.shift()
      }
    }
  },
})

export const { updateTagData } = tagSlice.actions

export const tagReducer = tagSlice.reducer