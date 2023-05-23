import { createSlice } from '@reduxjs/toolkit'

export const plantSlice = createSlice({
  name: 'plants',
  initialState: {},
  reducers: {
    loadAllPlantsData: (state, action) => {
      action.payload.forEach((plant) => {
        state[plant.plantId] = {
          plantId: plant.plantId,
          plantName: plant.plantName,
          plantDescription: plant.plantDescription,
          plantPhoto: plant.plantPhoto,
          tags: {},
        }
        plant.tags.forEach((tag) => {
          state[plant.plantId].tags[tag.assetId] = tag.name
        });
      });
    }
  },
})

export const { loadAllPlantsData } = plantSlice.actions

export const plantReducer = plantSlice.reducer