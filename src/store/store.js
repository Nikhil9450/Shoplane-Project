import { configureStore } from '@reduxjs/toolkit';
import { ItemCounterReducer } from '../slices/CartItemCounterSlice';
export default configureStore({
  reducer: {
    ItemCounter:ItemCounterReducer
    // Add more reducers here if needed
  },
});