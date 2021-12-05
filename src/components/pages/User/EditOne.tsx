import React, { ReactElement } from "react";
import { useHistory, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/app/hooks";
import { changeEdit, setModified } from "../../../store/slices/edit-slice";
import Edit from "../../forms/workout/Edit";
import { workoutType } from "./CheckWorkoutTemplates";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function EditOne(): ReactElement | null {
  const query = useQuery();
  const index = +(query.get("index") || 0);
  const location = useLocation();
  const history = useHistory();
  const { template } = useAppSelector((state) => state.edit);
  const curTempl = template[index];
  const dispatch = useAppDispatch();

  const handleSubmit = (workout: workoutType) => {
    const newArr = [...template];
    newArr[index] = workout;
    const editPath: string[] = location.pathname.split("/");
    editPath.pop();
    dispatch(changeEdit(newArr));
    dispatch(setModified());
    history.push(editPath.join("/"));
  };

  const handleReturn = () => {
    const editPath: string[] = location.pathname.split("/");
    editPath.pop();
    history.push(editPath.join("/"));
  };

  return (
    <div className="max-w-md mx-auto">
      <Edit
        name={curTempl.name}
        sets={curTempl.sets}
        reps={curTempl.reps}
        weight={curTempl.weight}
        handleSubmit={handleSubmit}
        handleReturn={handleReturn}
      />
    </div>
  );
}
