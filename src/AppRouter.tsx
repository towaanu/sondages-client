import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import PollPage from "./pages/PollPage";
import AskPage from "./pages/AskPage";
import QuestionRecapPage from "./pages/QuestionRecapPage";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/poll/:id">
          <PollPage />
        </Route>
        <Route path="/question/:id">
          <QuestionRecapPage />
        </Route>
        <Route path="/ask/:id">
          <AskPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
