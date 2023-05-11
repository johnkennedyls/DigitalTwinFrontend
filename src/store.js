import { configureStore } from '@reduxjs/toolkit'
import { plantReducer } from './features/plant/plantSlice'
import { tagReducer } from './features/plant/tagSlice'
export const store = configureStore({
    reducer: {
        plants:plantReducer,
        tags: tagReducer
    }
})