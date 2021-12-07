import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { workoutType } from "../../pages/User/CheckWorkoutTemplates";

interface editTypes extends workoutType {
  handleSubmit: (values: workoutType) => void;
  handleReturn: () => void;
}

const Edit = ({
  name,
  sets,
  reps,
  weight,
  handleSubmit,
  handleReturn,
}: editTypes) => {
  return (
    <div className="p-2 my-20 max-w-full lg:max-w-2xl mx-auto border-2 border-blue-900 border-solid shadow-2xl rounded-xl">
      <Formik
        initialValues={{ name, sets, reps, weight }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(25, "Must be 25 characters or less")
            .required("Required"),
          sets: Yup.number().positive().max(15).integer().required("Required"),
          reps: Yup.number().positive().integer().required("Required"),
          weight: Yup.number().moreThan(-1).integer().required("Required"),
        })}
        onSubmit={(values: workoutType) => {
          handleSubmit(values);
        }}
      >
        <Form className="">
          <label htmlFor="name" className="label">
            Exercise Name
          </label>
          <Field className="input" name="name" type="text" />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-700 pb-4 text-xl"
          />

          <label className="label" htmlFor="sets">
            Sets Count
          </label>
          <Field name="sets" type="number" className="input" />
          <ErrorMessage
            name="sets"
            component="div"
            className="text-red-700 text-xl pb-4 italic"
          />

          <label htmlFor="reps" className="label">
            Reps Count
          </label>
          <Field name="reps" type="number" className="input" />
          <ErrorMessage
            name="reps"
            component="div"
            className="text-red-700 pb-4 text-xl italic"
          />

          <label htmlFor="weight" className="label">
            Weight
          </label>
          <Field name="weight" type="number" className="input" />
          <ErrorMessage
            name="weight"
            component="div"
            className="text-red-700 pb-4 text-xl italic"
          />

          <button type="submit" className="btn-pos">
            Submit
          </button>
        </Form>
      </Formik>
      <button onClick={handleReturn} className="btn-del">
        Return
      </button>
    </div>
  );
};

export default Edit;
