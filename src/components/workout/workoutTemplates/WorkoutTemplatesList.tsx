import firebase from "firebase/app";

interface ListTypes {
  templateData: firebase.firestore.DocumentData[] | null;
  onShowPreview: (item: any) => void;
  handleChangeTemplate: (name: string) => void;
  deleteItem: (name: string) => void;
}
/** maps a given workout list collection */
const WorkoutTemplatesList = ({
  templateData,
  onShowPreview,
  handleChangeTemplate,
  deleteItem,
}: ListTypes) => {
  const templatesMapped: any = templateData?.map((item, index) => (
    <div
      key={`${item.name}${index}`}
      className="p-2 my-4 mx-auto max-w-xl lg:max-w-2xl"
    >
      <div>
        <p>Name: {item.name}</p>
        <p>
          Date added:{" "}
          {item.date.toDate().toDateString() +
            " " +
            item.date.toDate().toLocaleTimeString()}
        </p>
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
