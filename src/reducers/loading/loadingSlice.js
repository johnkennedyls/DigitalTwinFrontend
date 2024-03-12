import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false
};
export const loadingSlice = createSlice({
    name:"loading",
    initialState,
    reducers:{
        isLoading : (state, action )=>{
            state.status = action.payload
        }
    }
})

export const { isLoading } = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;