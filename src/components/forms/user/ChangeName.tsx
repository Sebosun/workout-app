import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface NameInterface {
  handleSubmit: (name: string) => void;
}

const ChangeName = ({ handleSubmit }: NameInterface) => {
  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(25, "Must be 25 characters or less")
          .required("Required"),
      })}
      onSubmit={({ name }) => {
        handleSubmit(name);
      }}
    >
      <Form className="border-b-2 border-purple-700 pb-4 mb-4">
        <label htmlFor="name" className="label">
          Workout Name
        </label>
        <Field className="input" name="name" type="text" />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-700 pb-4 text-xl"
        />
        <button type="submit" className="btn-pos">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default ChangeName;
