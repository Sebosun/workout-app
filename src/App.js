import "./App.css";
import WorkoutPage from "./components/pages/WorkoutPage";
import Settings from "../src/components/pages/Settings";
import Header from "./components/ui/Header";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/workout">
          <WorkoutPage />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
