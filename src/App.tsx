import AppRouter from "./AppRouter";
import { Provider } from "urql";
import { initUrqlClient } from "./urqlClient";

const urqlClient = initUrqlClient();

function App() {
  return (
    <Provider value={urqlClient}>
      <section className="section">
        <div className="container">
          <AppRouter />
        </div>
      </section>
    </Provider>
  );
}

export default App;
