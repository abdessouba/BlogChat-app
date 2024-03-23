// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {id: 1234},
  },
  reducers: {
    initializingUser: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { initializingUser } = counterSlice.actions;
export default counterSlice.reducer;
