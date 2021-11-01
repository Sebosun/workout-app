import firebase from "firebase/app";

interface ListTypes {
  templateData: firebase.firestore.DocumentData[] | null;
  onShowPreview: (item: any) => void;
  handleChangeTemplate: (name: string) => void;
}
/** maps a given workout list collection */
const WorkoutTemplatesList = ({
  templateData,
  onShowPreview,
  handleChangeTemplate,
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
        <button onClick={() => onShowPreview(item)} className="btn">
          Show preview
        </button>
        <button className="btn" onClick={() => handleChangeTemplate(item.name)}>
          Set as current template
        </button>
      </div>
    </div>
  ));

  return <>{templatesMapped}</>;
};

export default WorkoutTemplatesList;
