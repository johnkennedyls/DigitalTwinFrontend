import { createSlice } from '@reduxjs/toolkit'
import * as dummy from './dummy.json' 

export const plantSlice = createSlice({
  name: 'plants',
  initialState: dummy['default'],
  reducers: {
    loadAllPlantsData: (state, action) => {

      state.value = action.payload
    },
    updatePlantData: (state, action) => {

      state.value = {}
      console.log(action)
    },
  },
})

// Action creators are generated for each case reducer function
export const { loadAllPlantsData, updatePlantData } = plantSlice.actions

export const plantReducer = plantSlice.reducer