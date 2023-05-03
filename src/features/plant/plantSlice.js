import { createSlice } from '@reduxjs/toolkit'
import * as dummy from './dummy.json' 
import { LIMIT_STORED_DATA } from '../../config/config'

export const plantSlice = createSlice({
  name: 'plants',
  initialState: dummy['default'],
  reducers: {
    loadAllPlantsData: (state, action) => {
      
      state.value = action.payload
    },
    updatePlantData: (state, action) => {
      const { plantName, newData } = action.payload
      

      Object.keys(newData).forEach((sensor) => {
        if(state[plantName][sensor].length >= LIMIT_STORED_DATA){
          state[plantName][sensor].shift()
        }
        state[plantName][sensor] = [...state[plantName][sensor],newData[sensor]]
      })
    },
    updateDummy: (state, action) => {
      state['Planta Bioreactor 40LA']['Date'].push('XDD')
      state['Planta Bioreactor 40LA']['Temperatura'].push(action.payload)
    }
  },
})

export const { loadAllPlantsData, updatePlantData, updateDummy } = plantSlice.actions

export const plantReducer = plantSlice.reducer