import { combineReducers } from '@reduxjs/toolkit';

import { plantReducer } from './plant/plantSlice';
import { tagReducer } from './plant/tagSlice';
import { executionReducer } from './plant/executionSlice';
import { processReducer } from './plant/processSlice';
import { loadingReducer } from './loading/loadingSlice';

export const rootReducer = combineReducers({
  plants: plantReducer,
  tags: tagReducer,
  executions: executionReducer,
  processes: processReducer,
  loading: loadingReducer
});
