import { current } from "@reduxjs/toolkit";
import firebase from "firebase/app";

interface ListTypes {
  templateData: firebase.firestore.DocumentData[] | null;
  onShowPreview: (item: any) => void;
  handleChangeTemplate: (name: string) => void;
  deleteItem: (name: string) => void;
  currentWorkoutTemplate: string;
}
/** maps a given workout list collection */
const WorkoutTemplatesList = ({
  templateData,
  onShowPreview,
  handleChangeTemplate,
  deleteItem,
  currentWorkoutTemplate,
}: ListTypes) => {
  const templatesMapped: any = templateData?.map((item, index) => (
    <div
      key={`${item.name}${index}`}
      className={`p-2 my-4 mx-auto max-w-xl lg:max-w-2xl ${
        currentWorkoutTemplate === item.name &&
        "border-2 border-green-600 rounded-xl"
      }`}
    >
      {currentWorkoutTemplate === item.name && (
        <p className="  text-green-500 ">Active</p>
      )}
      <div>
        <div className="grid grid-cols-2  gap-4">
          <p>Template name: {item.name}</p>
          <div className="flex justify-between">
            <p>Date added:</p>
            <p className="text-red-400">
              {item.date.toDate().toLocaleTimeString() +
                " " +
                item.date.toDate().toDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="btn"
            onClick={() => handleChangeTemplate(item.name)}
          >
            Set as current template
          </button>
          <button onClick={() => onShowPreview(item)} className="btn">
            Show preview
          </button>
        </div>
        <button onClick={() => deleteItem(item.name)} className="btn">
          Delete
        </button>
      </div>
    </div>
  ));

  return <>{templatesMapped}</>;
};

export default WorkoutTemplatesList;
