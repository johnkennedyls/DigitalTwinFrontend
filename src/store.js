import { configureStore } from '@reduxjs/toolkit'
import { plantReducer } from './reducers/plant/plantSlice'
import { tagReducer } from './reducers/plant/tagSlice'
export const store = configureStore({
    reducer: {
        plants:plantReducer,
        tags: tagReducer
    }
})