import { configureStore } from '@reduxjs/toolkit'
import flightSearchReducer from './flightSearchSlice'

export default configureStore({
  reducer: {
    
        flightSearch: flightSearchReducer

  }
})