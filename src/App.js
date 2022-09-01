import { ReactNotifications } from "react-notifications-component";
import TodoContainer from "./components/container/TodoContainer";

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <TodoContainer />
    </div>
  );
}

export default App;
