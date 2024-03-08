import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

export const executionSlice = createSlice({
  name: 'executions',
  initialState: {},
  reducers: {
    loadAllExecutionsData: (state, action) => {
      const newState = {}

      action.payload.forEach((execution) => {
        newState[execution.id] = {
          id: execution.id,
          processId: execution.processId,
          processName: execution.processName,
          operName: execution.operName,
          startDate: moment(new Date(execution.startDate)).format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment(new Date(execution.endDate)).format('YYYY-MM-DD HH:mm:ss'),
          state: execution.state,
          logs: execution.logs
        }
      })

      return newState
    },
    deleteExecution: (state, action) => {
      delete state[action.payload]
    }
  }
})

export const { loadAllExecutionsData, deleteExecution } = executionSlice.actions

export const executionReducer = executionSlice.reducer
