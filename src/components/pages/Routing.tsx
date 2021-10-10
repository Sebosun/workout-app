import WorkoutPage from "./WorkoutPage";
import Settings from "./Settings";
import NotFound from "./NotFound";
import FrontPage from "./FrontPage";
import AddWorkoutTemplate from './AddWorkoutTemplate'
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "../wrappers/PrivateRoute";
import User from "./User";

const Routing = () => {
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

        <PrivateRoute authenticationPath="/login" exact path="/user">
          <User />
        </PrivateRoute>

        <PrivateRoute authenticationPath="/login" exact path="/add-workout">
          <AddWorkoutTemplate />
        </PrivateRoute>

        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Routing;
