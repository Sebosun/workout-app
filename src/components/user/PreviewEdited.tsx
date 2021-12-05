import { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { turnOffModified } from "../../store/slices/edit-slice";
import WorkoutTemplatePreview from "../workout/workoutTemplates/WorkoutTemplatePreview";

interface previewTypes {
  updateWorkout: () => void;
  handleEdit: (index: number) => void;
}

export default function PreviewEdited({
  updateWorkout,
  handleEdit,
}: previewTypes): ReactElement | null {
  const dispatch = useAppDispatch();

  const { template, isModified } = useAppSelector((state) => state.edit);

  useEffect(() => {
    return () => {
      dispatch(turnOffModified());
    };
    //this runs on unmount and will clear the condition for refetching
  }, [isModified]);

  const handleCancel = () => {
    dispatch(turnOffModified());
  };

  return (
    <div className="p-2 mx-auto max-w-md lg:max-w-xl">
      <p className="text-center text-2xl">New Workout</p>
      <WorkoutTemplatePreview onEdit={handleEdit} workout={template} />
      <button onClick={updateWorkout} className="btn-pos">
        Confirm
      </button>
      <button onClick={handleCancel} className="btn-del">
        Cancel
      </button>
    </div>
  );
}
