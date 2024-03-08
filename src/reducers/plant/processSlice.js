import { createSlice } from '@reduxjs/toolkit'

export const processSlice = createSlice({
  name: 'processes',
  initialState: {},
  reducers: {
    loadProcessesByPlant: (state, action) => {
      const newState = {}
      action.payload.forEach((process) => {
        newState[process.id] = {
          id: process.id,
          name: process.name,
          description: process.description,
          workSpaceId: process.workSpaceId,
          instructions: process.instructions,
          assets: process.assets
        }
      })

      return newState
    },
    deleteProcess: (state, action) => {
      delete state[action.payload]
    }
  }
})

export const { loadProcessesByPlant, deleteProcess } = processSlice.actions

export const processReducer = processSlice.reducer
