import { createSlice } from "@reduxjs/toolkit";
import {
  getDataFromLocalStorage,
  addDataToLocalStorage,
  removeDataFromLocalStorage,
} from "../../util/localStorege";
const initialState = {
  data: getDataFromLocalStorage("data"),
  cards: getDataFromLocalStorage("cards"),
  id: "",
  bank: "",
  creditLine: 0,
  balance: 0,
  isEditing: false,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    addCard: (state, { payload }) => {
      const id = new Date().getTime();
      state.cards.push({ ...payload, id: id });
      state.data.push({
        name: payload.bank,
        balance: payload.balance,
        limit: payload.creditLine - payload.balance,
        id: id,
      });
      addDataToLocalStorage("cards", state.cards);
      addDataToLocalStorage("data", state.data);
      //   console.log(state.cards, payload);
    },
    deleteCard: (state, { payload }) => {
      state.data = state.data.filter((d) => d.name !== payload);
      state.cards = state.cards.filter((d) => d.bank !== payload);
      addDataToLocalStorage("data", state.data);
      addDataToLocalStorage("cards", state.cards);
      //state.cards = newCards;
    },
    editCard: (state, { payload }) => {
      const editStateInCards = state.cards.find(
        (card) => card.id == payload.eddiedCard.id
      );
      const editStateInData = state.data.find(
        (card) => card.id == payload.eddiedCard.id
      );

      editStateInCards.bank = payload.bank;
      editStateInData.name = payload.bank;
      editStateInData.balance = payload.balance;
      editStateInCards.balance = payload.balance;
      editStateInCards.creditLine = payload.creditLine;
      editStateInData.limit = payload.creditLine - payload.balance;
      addDataToLocalStorage("cards", state.cards);
      addDataToLocalStorage("data", state.data);
      //console.log(payload.eddiedCard.id);
      //find card by id of edited card, update
      // state.isEditing = true;
    },
    clearValues: (state) => {
      return {
        ...initialState,
        cards: state.cards,
        data: state.data,
      };
    },
  },
});
export const { handleChange, clearValues, addCard, deleteCard, editCard } =
  cardSlice.actions;
export default cardSlice.reducer;
