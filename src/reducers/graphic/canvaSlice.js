import { createSlice, createSelector } from '@reduxjs/toolkit';

export const canvaSlice = createSlice({
  name: 'canvas',
  initialState: {
    canvases: [],
    creatingCanvas: null
  },
  reducers: {
    setCanvases: (state, action) => {
      state.canvases = action.payload;
    },
    setCreatingCanvas: (state, action) => {
      state.creatingCanvas = {
        ...state.creatingCanvas,
        ...action.payload
      };
    },
    clearCreatingCanvas: (state) => {
      state.creatingCanvas = null;
    }
  }
});

const selCanvases = state => state.canvas.canvases;
const selCreatingCanvas = state => state.canvas.creatingCanvas;

export const selectCanvasById = createSelector(
  [selCanvases, (state, canvasId) => canvasId],
  (canvases, canvasId) => {
    return canvases.find(canvas => canvas.canvasId === parseInt(canvasId));
  }
);

export const selectCreatingCanvas = createSelector(
  [selCreatingCanvas],
  creatingCanvas => {
    return creatingCanvas;
  }
);


export const { setCanvases, setCreatingCanvas, clearCreatingCanvas } = canvaSlice.actions;

export const canvaReducer = canvaSlice.reducer;