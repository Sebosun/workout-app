import React, { useRef } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/app/hooks";
import { displayError } from "../../../store/slices/ui-slice";

const RegistrationForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const { signup }: any = useAuth();
  const history = useHistory();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordRef.current?.value !== passwordConfirmationRef.current?.value) {
      dispatch(displayError("Passwords do not match"));
    } else {
      try {
        await signup(emailRef.current?.value, passwordRef.current?.value);
        history.push("/");
      } catch (err: any) {
        dispatch(displayError(err.message));
      }
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto">
        <p className="m-4 text-4xl text-center">Registration</p>
        <form
          onSubmit={submitHandler}
          className="p-6 pb-8 bg-gray-800 border-2 border-purple-500 border-solid shadow-md rounded-2xl"
        >
          <label htmlFor="email" className="block text-xl font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="my-2 bg-gray-900 border-2 border-purple-800 rounded-md focus:border-gray-50 focus:ring-gray-50 solid"
            id="email"
            ref={emailRef}
            placeholder="Email"
            required
          />
          <label htmlFor="password" className="block text-xl font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block my-2 bg-gray-900 border-2 border-purple-800 rounded-md focus:border-gray-50 focus:ring-gray-50 solid"
            ref={passwordRef}
            placeholder="***********"
            required
          />
          <label
            htmlFor="password-confirmation"
            className="block text-xl font-bold"
          >
            Password Confirmation
          </label>
          <input
            type="password"
            name="password-confirmation"
            id="password-confirmation"
            className="block my-2 bg-gray-900 border-2 border-purple-800 rounded-md focus:border-gray-50 focus:ring-gray-50 solid"
            ref={passwordConfirmationRef}
            placeholder="***********"
            required
          />
          <button className="btn">Submit</button>
        </form>
        <Link className="flex my-2 justify-center" to="./registration">
          Already have an account?
          <Link to="./login" className="mx-2 text-blue-400">
            Login here.
          </Link>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
