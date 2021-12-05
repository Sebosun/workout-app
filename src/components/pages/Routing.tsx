import WorkoutPage from "./WorkoutPage";
import Settings from "./Settings";
import NotFound from "./NotFound";
import FrontPage from "./FrontPage";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "../wrappers/PrivateRoute";

import User from "./User/User";
import CheckWorkoutTemplates from "./User/CheckWorkoutTemplates";
import AddWorkoutTemplate from "./User/AddWorkoutTemplate";
import Dashboard from "./Dashboard";
import Preview from "./User/Preview";
import Edit from "../forms/workout/Edit";
import EditOne from "./User/EditOne";

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

        <PrivateRoute authenticationPath="/login" exact path="/user">
          <User />
        </PrivateRoute>

        <PrivateRoute
          authenticationPath="/login"
          exact
          path="/user/custom-templates"
        >
          <CheckWorkoutTemplates />
        </PrivateRoute>

        <PrivateRoute
          authenticationPath="/login"
          exact
          path="/user/custom-templates/:edit"
        >
          <Preview />
        </PrivateRoute>

        <PrivateRoute
          authenticationPath="/login"
          path="/user/custom-templates/:edit/edit"
        >
          <EditOne />
        </PrivateRoute>

        <PrivateRoute
          authenticationPath="/login"
          exact
          path="/user/add-workout"
        >
          <AddWorkoutTemplate />
        </PrivateRoute>

        <PrivateRoute authenticationPath="/login" exact path="/dashboard">
          <Dashboard />
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
