import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import {
  changeEdit,
  setModified,
  turnOffModified,
} from "../../store/slices/edit-slice";
import PortalWrapper from "../ui/PortalWrapper";
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

  const { template } = useAppSelector((state) => state.edit);
  const [finalConfirmation, setFinalConfirmaton] = useState(false);

  const handleCancel = () => {
    dispatch(turnOffModified());
  };

  const handleDelete = (index: number) => {
    const newArr = [...template];
    newArr.splice(index, 1);
    dispatch(setModified());
    dispatch(changeEdit(newArr));
  };

  const handleConfirmation = () => {
    updateWorkout();
  };

  const handleSubmit = () => {
    setFinalConfirmaton(true);
  };
  const handleCancelSubmit = () => {
    setFinalConfirmaton(false);
  };

  return (
    <div className="p-2 mx-auto max-w-md lg:max-w-xl">
      <p className="text-center text-2xl">New Workout</p>
      <WorkoutTemplatePreview
        onDelete={handleDelete}
        onEdit={handleEdit}
        workout={template}
      />
      <button onClick={handleSubmit} className="btn-pos">
        Submit
      </button>
      <button onClick={handleCancel} className="btn-del">
        Cancel
      </button>
      {finalConfirmation && (
        <PortalWrapper>
          <p>Are you sure?</p>
          <button onClick={handleConfirmation} className="btn">
            Yes
          </button>
          <button onClick={handleCancelSubmit} className="btn">
            No
          </button>
        </PortalWrapper>
      )}
    </div>
  );
}
