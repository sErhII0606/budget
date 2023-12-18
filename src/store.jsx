import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./feachers/card/cardSlice";

import modalSlice from "./feachers/modal/modalSlice";

export const store = configureStore({
  reducer: {
    card: cardSlice,

    modal: modalSlice,
  },
});
