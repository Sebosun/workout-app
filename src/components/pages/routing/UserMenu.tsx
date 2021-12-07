import { ReactElement } from "react";
import PrivateRoute from "../../wrappers/PrivateRoute";
import AddExercise from "../User/AddExercise";
import AddWorkoutTemplate from "../User/AddWorkoutTemplate";
import CheckWorkoutTemplates from "../User/CheckWorkoutTemplates";
import EditOne from "../User/EditOne";
import Preview from "../User/Preview";
import User from "../User/User";

export default function UserMenu(): ReactElement | null {
  return (
    <>
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
        path="/user/custom-templates/:edit/add"
      >
        <AddExercise />
      </PrivateRoute>

      <PrivateRoute authenticationPath="/login" exact path="/user/add-workout">
        <AddWorkoutTemplate />
      </PrivateRoute>
    </>
  );
}
