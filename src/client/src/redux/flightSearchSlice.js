import { createSlice } from '@reduxjs/toolkit'

export const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState: {
    flights: {}
  },
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setFlights } = flightSearchSlice.actions

export default flightSearchSlice.reducer