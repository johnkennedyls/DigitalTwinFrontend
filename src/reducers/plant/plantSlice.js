import { createSlice } from '@reduxjs/toolkit'

export const plantSlice = createSlice({
  name: 'plants',
  initialState: {},
  reducers: {
    loadAllPlantsData: (state, action) => {
      action.payload.forEach((plant) => {
        state[plant.plantId] = {
          plantId: plant.plantId,
          assetId: plant.assetId,
          plantName: plant.plantName,
          plantDescription: plant.plantDescription,
          plantPhoto: plant.plantPhoto,
          tags: {},
        }
        plant.tags.forEach((tag) => {
          state[plant.plantId].tags[tag.assetId] = tag.name
        });
      });
    },
    deletePlant: (state, action) => {
      delete state[action.payload]
    }
  },
})

export const { loadAllPlantsData, deletePlant } = plantSlice.actions

export const plantReducer = plantSlice.reducer