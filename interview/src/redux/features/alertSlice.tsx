import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  itemId: null
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setShowAlert: (state, action) => {
      state.isVisible = action.payload.isVisible;
      state.itemId = action.payload.itemId;
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.itemId = null;
    }
  }
});

export const { setShowAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
