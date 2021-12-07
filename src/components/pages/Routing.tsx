import WorkoutPage from "./WorkoutPage";
import Settings from "./Settings";
import NotFound from "./NotFound";
import FrontPage from "./FrontPage";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "../wrappers/PrivateRoute";

import User from "./User/User";
import CheckWorkoutTemplates from "./User/CheckWorkoutTemplates";
import AddWorkoutTemplate from "./User/AddWorkoutTemplate";
import Dashboard from "./Dashboard";
import Preview from "./User/Preview";
import EditOne from "./User/EditOne";
import AddExercise from "./User/AddExercise";
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

        <UserMenu />

        <PrivateRoute authenticationPath="/login" exact path="/workout">
          <WorkoutPage />
        </PrivateRoute>

        <PrivateRoute authenticationPath="/login" exact path="/settings">
          <Settings />
        </PrivateRoute>

        <PrivateRoute authenticationPath="/login" exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>

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
