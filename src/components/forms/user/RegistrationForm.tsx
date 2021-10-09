import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/app/hooks";

import Button from "../../ui/Button";
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
      <div className="w-full max-w-lg flex flex-col items-center mx-auto">
        <p className="m-4 text-4xl text-center">Registration</p>
        <form
          onSubmit={submitHandler}
          className="bg-gray-800
          shadow-md
          rounded
          p-6
          pb-8
          border-2 border-solid border-purple-500 rounded-2xl"
        >
          <label htmlFor="email" className="block text-white text-xl font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="rounded-md bg-gray-900 text-white focus:border-gray-50 focus:ring-gray-50  border-2 solid border-purple-800 my-2"
            id="email"
            ref={emailRef}
            placeholder="Email"
            required
          />
          <label
            htmlFor="password"
            className="block text-white text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="rounded-md block bg-gray-900 text-white focus:border-gray-50 focus:ring-gray-50 border-2 solid border-purple-800 my-2"
            ref={passwordRef}
            placeholder="***********"
            required
          />
          <label
            htmlFor="password-confirmation"
            className="block text-white text-xl font-bold"
          >
            Password Confirmation
          </label>
          <input
            type="password"
            name="password-confirmation"
            id="password-confirmation"
            className="rounded-md block bg-gray-900 text-white focus:border-gray-50 focus:ring-gray-50 border-2 solid border-purple-800 my-2"
            ref={passwordConfirmationRef}
            placeholder="***********"
            required
          />
          <button className="bg-gray-900 p-2 mt-2 w-full border-2 hover:border-indigo-700 hover:bg-blue-400 uppercase font-semibold tracking-tight border-solid border-purple-800 rounded-lg">
            Submit
          </button>
        </form>
        <Link className=" flex justify-center" to="./registration">
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
