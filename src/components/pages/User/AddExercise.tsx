import { ReactElement } from "react";
import { useHistory, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { changeEdit, setModified } from "../../../store/slices/edit-slice";
import ExerciseForm, { ExerciseTypes } from "../../forms/workout/ExerciseForm";

const processReturnPath = (pathname: string) => {
  const splitPath: string[] = pathname.split("/");
  splitPath.pop();
  return splitPath.join("/");
};

export default function AddExercise(): ReactElement | null {
  const location = useLocation();
  const history = useHistory();
  const { template } = useAppSelector((state) => state.edit);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: ExerciseTypes) => {
    dispatch(setModified());
    dispatch(changeEdit([...template, values]));
    history.push(processReturnPath(location.pathname));
  };
  const handleReturn = () => {
    history.push(processReturnPath(location.pathname));
  };

  return (
    <>
      <ExerciseForm handleSubmit={handleSubmit}>
        <button className="btn" onClick={handleReturn}>
          Return
        </button>
      </ExerciseForm>
    </>
  );
}
