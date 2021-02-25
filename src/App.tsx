import AppRouter from "./AppRouter";
import { Provider } from "urql";
import { initUrqlClient } from "./urqlClient";

const urqlClient = initUrqlClient();

function App() {
  return (
    <Provider value={urqlClient}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
