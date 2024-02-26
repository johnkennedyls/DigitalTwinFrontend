import { configureStore } from '@reduxjs/toolkit'
import { plantReducer } from './reducers/plant/plantSlice'
import { tagReducer } from './reducers/plant/tagSlice'
import { executionReducer } from './reducers/plant/executionSlice'
import { processReducer } from './reducers/plant/processSlice'
export const store = configureStore({
    reducer: {
        plants:plantReducer,
        tags: tagReducer,
        executions: executionReducer,
        processes: processReducer
    }
})