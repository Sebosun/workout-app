import React, { useRef } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login }: any = useAuth();
  const history = useHistory();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(emailRef.current?.value, passwordRef.current?.value);
      history.push("/");
    } catch {
      throw new Error("An error has occured");
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto">
        <p className="m-4 text-4xl text-center">Login</p>
        <form
          onSubmit={submitHandler}
          className="p-6 pb-8 bg-gray-800 border-2 border-purple-500 border-solid rounded shadow-md rounded-2xl"
        >
          <label htmlFor="email" className="block text-xl font-bold text-white">
            Email
          </label>
          <input
            type="email"
            defaultValue="test@github.log"
            name="email"
            className="my-2 text-white bg-gray-900 border-2 border-purple-800 rounded-md focus:border-gray-50 focus:ring-gray-50 solid"
            id="email"
            ref={emailRef}
            placeholder="Email"
            required
          />
          <label
            htmlFor="password"
            className="block text-xl font-bold text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            defaultValue="1234567"
            className="block my-2 text-white bg-gray-900 border-2 border-purple-800 rounded-md focus:border-gray-50 focus:ring-gray-50 solid"
            ref={passwordRef}
            placeholder="***********"
            required
          />
          <button className="w-full p-2 mt-2 font-semibold tracking-tight uppercase bg-gray-900 border-2 border-purple-800 border-solid rounded-lg hover:border-indigo-700 hover:bg-blue-400">
            {" "}
            Submit{" "}
          </button>
        </form>
        <Link className="flex justify-center " to="./registration">
          Don't have an account?
          <Link to="./registration" className="mx-2 text-blue-400">
            Create one here.
          </Link>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
