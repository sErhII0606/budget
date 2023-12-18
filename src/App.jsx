import PieChartComponent from "./components/PieChartComponent";
import Form from "./components/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <main>
      <Form />
      <PieChartComponent />
      <ToastContainer position="top-center" />
    </main>
  );
}

export default App;
