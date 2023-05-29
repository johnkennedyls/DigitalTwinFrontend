import { combineReducers } from '@reduxjs/toolkit';
import {plantReducer} from './plant/plantSlice';
import {tagReducer} from './plant/tagSlice';

const rootReducer = combineReducers({
  plants: plantReducer,
  tags: tagReducer,
});

export default rootReducer;
