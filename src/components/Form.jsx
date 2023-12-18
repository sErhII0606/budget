import React from "react";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearValues, addCard } from "../feachers/card/cardSlice";

const Form = () => {
  const { cards, bank, creditLine, balance, isEditing } = useSelector(
    (store) => store.card
  );

  const dispatch = useDispatch();

  const handleCardInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  return (
    <>
      <h3>Add Credit Cart</h3>
      <FormRow
        type="text"
        name="bank"
        value={bank}
        handleChange={handleCardInput}
      />

      <FormRow
        type="number"
        name="creditLine"
        value={creditLine}
        handleChange={handleCardInput}
        labelText="Credit Line"
      />
      <FormRow
        type="number"
        name="balance"
        value={balance}
        handleChange={handleCardInput}
      />
      <button
        type="button"
        className="btn "
        onClick={() => {
          if (!bank || creditLine <= 0 || balance < 0) {
            toast.error("Fill out all fields please");
            return;
          }
          if (cards.find((card) => card.bank == bank)) {
            toast.error("Card already exist");
            return;
          }
          dispatch(addCard({ bank, creditLine, balance }));
          toast.success("Card added");
          dispatch(clearValues());
        }}
      >
        Add new card
      </button>
      <button
        type="button"
        className="btn "
        onClick={() => {
          dispatch(clearValues());
        }}
      >
        Clear inputs
      </button>
    </>
  );
};

export default Form;
