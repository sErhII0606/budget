import { useSelector, useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { openModal } from "../feachers/modal/modalSlice";
import { deleteCard } from "../feachers/card/cardSlice";
import Modal from "./Modal";

const PieChartComponent = () => {
  const { isOpen, currentCardDisplay } = useSelector((store) => store.modal);
  const { data } = useSelector((store) => store.card);
  const dispatcher = useDispatch();

  if (data.length > 0) {
    return (
      <>
        {isOpen && <Modal card={currentCardDisplay} />}
        <BarChart
          width={1300}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onClick={(e) => {
            if (!e.activeLabel) return;
            dispatcher(openModal(e.activeLabel));

            // dispatcher(deleteCard(e.activeLabel));
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="balance" stackId="a" fill="#ef0a0a" />
          <Bar dataKey="limit" stackId="a" fill="#26f706" />
        </BarChart>
      </>
    );
  }

  return <h2>No cards to display</h2>;
};

export default PieChartComponent;
