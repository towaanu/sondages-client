import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import PollPage from "./pages/PollPage";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/poll/:id">
          <PollPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
