import { createSlice } from '@reduxjs/toolkit'

export const plantSlice = createSlice({
  name: 'plants',
  initialState: {},
  reducers: {
    loadAllPlantsData: (state, action) => {

      action.payload.forEach((plant) => {
        state[plant.assetId] = {
          name: plant.name,
          tags: {},
        }
        plant.childrens.forEach((tag) => {
          state[plant.assetId].tags[tag.assetId] = tag.name
        });
      });
    }
  },
})

export const { loadAllPlantsData } = plantSlice.actions

export const plantReducer = plantSlice.reducer