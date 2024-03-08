import { combineReducers } from '@reduxjs/toolkit'

import { plantReducer } from './plant/plantSlice'
import { tagReducer } from './plant/tagSlice'
import { executionReducer } from './plant/executionSlice'
import { processReducer } from './plant/processSlice'

const rootReducer = combineReducers({
  plants: plantReducer,
  tags: tagReducer,
  executions: executionReducer,
  processes: processReducer
})

export default rootReducer
