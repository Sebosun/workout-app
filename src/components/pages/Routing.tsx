import WorkoutPage from "./WorkoutPage";
import Settings from "./Settings";
import NotFound from "./NotFound";
import FrontPage from "./FrontPage";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "../wrappers/PrivateRoute";
import Dashboard from "./Dashboard";
import UserMenu from "./routing/UserMenu";

const Routing = () => {
  // may split this later into two components - logged in routes and 'normal routes'
  return (
    <>
      <Switch>
        <Route exact path="/">
          <FrontPage />
        </Route>

        <Route exact path="/login">
          <Login mode="login" />
        </Route>

        <Route exact path="/registration">
          <Login mode="registration" />
        </Route>

        <PrivateRoute authenticationPath="/login" exact path="/workout">
          <WorkoutPage />
        </PrivateRoute>

        <PrivateRoute authenticationPath="/login" exact path="/settings">
          <Settings />
        </PrivateRoute>

        <PrivateRoute authenticationPath="/login" exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>

        <UserMenu />

        <Route exact path="/not-found">
          <NotFound />
        </Route>

        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Routing;
