import { createSlice } from '@reduxjs/toolkit'

export const plantSlice = createSlice({
  name: 'plants',
  initialState: {},
  reducers: {
    loadAllPlantsData: (state, action) => {
      const newState = {}

      action.payload.forEach((plant) => {
        newState[plant.assetId] = {
          plantId: plant.assetId,
          assetId: plant.assetId,
          plantName: plant.plantName,
          plantDescription: plant.plantDescription,
          plantPhoto: plant.plantPhoto,
          tags: {}
        }
        plant.tags.forEach((tag) => {
          newState[plant.assetId].tags[tag.assetId] = tag.name
        })
      })

      return newState
    },
    deletePlant: (state, action) => {
      delete state[action.payload]
    }
  }
})

export const { loadAllPlantsData, deletePlant } = plantSlice.actions

export const plantReducer = plantSlice.reducer
