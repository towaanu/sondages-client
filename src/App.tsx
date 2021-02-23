import Home from "./pages/Home";
import {Provider} from 'urql';
import {initUrqlClient} from './urqlClient';

const urqlClient = initUrqlClient();

function App() {
  return (
    <Provider value={urqlClient}>
	<div className="App">
	  <Home />
	</div>
    </Provider>
  );
}

export default App;
