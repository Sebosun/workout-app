import WorkoutPage from "./WorkoutPage";
import Settings from "./Settings";
import NotFound from "./NotFound";
import FrontPage from "./FrontPage";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "../../store/app/hooks";
import Login from "./Login";
import PrivateRoute from "../wrappers/PrivateRoute";

const Routing = () => {
  const loggedIn = useAppSelector((state) => state.user.loginStatus);
  // may split this later into two components - logged in routes and 'normal routes'
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Redirect to="/main" />
        </Route>
        <Route path="/main">
          <FrontPage />
        </Route>

        <PrivateRoute authenticationPath="/login" exact path="/workout">
          <WorkoutPage />
        </PrivateRoute>

        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/login">
          <Login mode="login" />
        </Route>

        <Route exact path="/registration">
          <Login mode="registration" />
        </Route>

        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Routing;
