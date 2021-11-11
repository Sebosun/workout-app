import Input from "../templates/Input";

interface EditTypes {
  name: string;
  date: Date;
  workout: [];
}

const Edit = ({ name, date, workout }: EditTypes) => {
  return (
    <>
      {workout.map((item, index) => {
        return <h1>{JSON.stringify(item)}</h1>;
      })}
    </>
  );
};

export default Edit;
