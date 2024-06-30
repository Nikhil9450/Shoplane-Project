import { createSlice } from '@reduxjs/toolkit';

export const CartItemCounterSlice = createSlice({
  name: 'count',
  initialState: {},
  reducers: {
    addItemHandler: (state, action) => {
      const productId = action.payload;
      state[productId] = (state[productId] || 0) + 1;
    },
    deleteItemHandler: (state, action) => {
      const productId = action.payload;
      if (state[productId] > 0) {
        state[productId] -= 1;
      }
    },
  },
});

export const { addItemHandler, deleteItemHandler } = CartItemCounterSlice.actions;

export const selectTotalItems = (state) => {
  return Object.values(state.ItemCounter).reduce((total, count) => total + count, 0);
};

export const ItemCounterReducer = CartItemCounterSlice.reducer;
