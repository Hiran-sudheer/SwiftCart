import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    userLocation: null,
  },
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
});

export const { setUserLocation } = locationSlice.actions;
export default locationSlice.reducer;