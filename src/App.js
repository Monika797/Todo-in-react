import TodoContainer from "./components/TodoContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <TodoContainer />
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default App;
