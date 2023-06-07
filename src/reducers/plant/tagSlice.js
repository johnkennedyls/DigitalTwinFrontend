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
      console.log("updateTagData", action.payload)
      action.payload.forEach((tag) => {
        try{
          if (!state[tag.assetId]) {
            state[tag.assetId] = [];
          }
  
          const currentDate = moment(new Date(tag.timeStamp)).format('YYYY-MM-DD HH:mm:ss')
          state[tag.assetId].push([currentDate, tag.value])
          state.date.push(currentDate)
          if (state[tag.assetId].length > LIMIT_STORED_DATA) {
            state[tag.assetId].shift()
            state.date.shift()
          }
        }catch(err){
          console.log(err)
        }
        
      });

      if (state.date.length > LIMIT_STORED_DATA) {
        state.date.shift()
      }
    },
    clearTags: (state, action) => {
      
    }
  },
})

export const { updateTagData, clearTags } = tagSlice.actions

export const tagReducer = tagSlice.reducer