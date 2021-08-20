import "./App.css";
import WorkoutPage from "./components/pages/WorkoutPage";
import Settings from "../src/components/pages/Settings";
import NotFound from "./components/pages/NotFound";
import FrontPage from "./components/pages/FrontPage";
import Header from "./components/ui/Header";
import { Redirect, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { timerActions } from "./store/timer-slice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const timerRdx = useSelector((state) => state.timer.timer);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(timerActions.tickTimer());
    }, 1000);

    if (timerRdx === 0) {
      dispatch(timerActions.handleAction);
    }
    return () => clearTimeout(timer);
  }, [dispatch, timerRdx]);

  return (
    <div className="app">
      <Header />

      <Switch>
        <Route exact path="/">
          <Redirect to="/main" />
        </Route>

        <Route path="/main">
          <FrontPage />
        </Route>

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
