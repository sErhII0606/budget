import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCardDisplay: "",
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.currentCardDisplay = payload;
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
      state.currentCardDisplay = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
