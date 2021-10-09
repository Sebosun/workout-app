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
    console.log(emailRef.current?.value, passwordRef.current?.value);
    try {
      await login(emailRef.current?.value, passwordRef.current?.value);
      history.push("/");
    } catch {
      throw new Error("cos sie zjebało");
    }
  };

  return (
    <div className="p-2">
      <div className="w-full max-w-lg flex flex-col items-center mx-auto">
        <p className="m-4 text-4xl text-center">Login</p>
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
            defaultValue="test@github.log"
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
            defaultValue="1234567"
            className="rounded-md block bg-gray-900 text-white focus:border-gray-50 focus:ring-gray-50 border-2 solid border-purple-800 my-2"
            ref={passwordRef}
            placeholder="***********"
            required
          />
          <button className="bg-gray-900 p-2 mt-2 w-full border-2 hover:border-indigo-700 hover:bg-blue-400 uppercase font-semibold tracking-tight border-solid border-purple-800 rounded-lg">
            Submit
          </button>
        </form>
        <Link className=" flex justify-center" to="./registration">
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
