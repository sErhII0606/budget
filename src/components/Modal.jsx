import { closeModal } from "../feachers/modal/modalSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard, editCard, clearValues } from "../feachers/card/cardSlice";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import NeedleChart from "./NeedleChart";

const Modal = ({ card }) => {
  const { cards } = useSelector((state) => state.card);
  const { currentCardDisplay } = useSelector((store) => store.modal);
  const eddiedCard = cards.find((card) => card.bank === currentCardDisplay);

  const dispatch = useDispatch();

  //const handleCardInput = (e) => {
  // const name = e.target.name;
  // const value = e.target.value;
  // dispatch(handleChange({ name, value }));
  //};
  const [data, setData] = useState({
    bank: eddiedCard.bank,
    creditLine: eddiedCard.creditLine,
    balance: eddiedCard.balance,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <aside className="modal-container">
      <div className="modal">
        <button
          type="button"
          className="btn btn-close"
          onClick={() => dispatch(closeModal())}
        >
          X
        </button>

        {cards.map((cd, i) => {
          if (card === cd.bank) {
            return (
              <main key={i}>
                <FormRow
                  type="text"
                  name="bank"
                  value={data.bank}
                  handleChange={handleChange}
                />
                <FormRow
                  type="number"
                  name="creditLine"
                  value={data.creditLine}
                  handleChange={handleChange}
                  labelText="Credit Line"
                />
                <FormRow
                  type="number"
                  name="balance"
                  value={data.balance}
                  handleChange={handleChange}
                />
                <FormRow
                  type="number"
                  name="avToSpend"
                  labelText="Availeble money"
                  value={data.creditLine - data.balance}
                  handleChange={() => {}}
                />

                <div className="btn-container">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      if (
                        !data.bank ||
                        data.creditLine <= 0 ||
                        data.balance < 0
                      ) {
                        toast.error("Fill out all fields please");
                        return;
                      }

                      if (
                        cards
                          .filter((card) => card.id !== eddiedCard.id)
                          .find((card) => card.bank == data.bank)
                      ) {
                        toast.error("Card already exist");
                        return;
                      }
                      dispatch(editCard({ ...data, eddiedCard }));
                      toast.success("Card edited");
                      dispatch(clearValues());
                      dispatch(closeModal());
                    }}
                  >
                    Edit card
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      dispatch(deleteCard(cd.bank));
                      dispatch(closeModal());
                      toast.success("Card Removed");
                    }}
                  >
                    Delete card
                  </button>
                  <NeedleChart
                    creditLine={eddiedCard.creditLine}
                    value={eddiedCard.balance}
                  />
                </div>
              </main>
            );
          }
        })}
      </div>
    </aside>
  );
};

export default Modal;
