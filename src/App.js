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
import { settingsActions } from "./store/settings-slice";

function App() {
  const dispatch = useDispatch();
  const timerRdx = useSelector((state) => state.timer.timer);
  const timerActive = useSelector((state) => state.timer.active);
  const timerCooldown = useSelector((state) => state.settings.cooldown);

  const readLocalStorage = () => {
    const cooldown = localStorage.getItem("cooldown");
    return { cooldown: cooldown };
  };

  // runs localstorage on app load, saves data in the settings
  //
  useEffect(() => {
    const localStorage = readLocalStorage();
    if (localStorage.cooldown) {
      dispatch(settingsActions.changeCooldown(localStorage.cooldown));
    }
  }, []);

  useEffect(() => {
    if (timerActive) {
      const timer = setTimeout(() => {
        dispatch(timerActions.tickTimer());
      }, 1000);

      if (timerRdx <= 0) {
        dispatch(timerActions.handleAction());
      }
      return () => clearTimeout(timer);
    }
  }, [dispatch, timerRdx, timerActive]);

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
        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
