import { documentTypes } from "../../pages/User/CheckWorkoutTemplates";

interface ListTypes {
  templateData: documentTypes[];
  onShowPreview: (item: string) => void;
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
  console.log(templateData);
  const templatesMapped: any = templateData?.map((item, index) => (
    <div
      key={`${item.workouts.name}${index}`}
      className={`p-2 my-4 mx-auto max-w-xl lg:max-w-2xl`}
    >
      <div
        className={`
${
  currentWorkoutTemplate === item.workouts.name &&
  "border-2 border-green-400 rounded-lg p-2"
}
        `}
      >
        {currentWorkoutTemplate === item.workouts.name && (
          <p className="text-green-500 ">Active</p>
        )}
        <div>
          <div className="gap-4">
            <p>Template name: {item.workouts.name}</p>
            <div className="flex justify-between">
              <p>Date added:</p>
              <div className="flex gap-2">
                <p>{item.workouts.date.toDate().toLocaleTimeString()}</p>
                <p className="text-blue-300">
                  {item.workouts.date.toDate().toDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="btn-pos"
              onClick={() => handleChangeTemplate(item.workouts.name)}
            >
              Set as current template
            </button>
            <button onClick={() => onShowPreview(item.id)} className="btn">
              Show preview
            </button>
          </div>
          <button
            onClick={() => deleteItem(item.workouts.name)}
            className="btn-del"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));

  return <>{templatesMapped}</>;
};

export default WorkoutTemplatesList;
