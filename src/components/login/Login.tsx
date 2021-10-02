import { useState } from "react";
import LoginForm from "../forms/user/LoginForm";
import RegistrationForm from "../forms/user/RegistrationForm";
import PortalWrapper from "../ui/PortalWrapper";
import Error from "../ui/Error";
import { Link } from "react-router-dom";

interface ErrorState {
  isActive: boolean;
  errorMessage: string;
}

interface LoginState {
  mode: "login" | "registration";
}

const initialErrorState: ErrorState = {
  isActive: false,
  errorMessage: "INVALID_PASSWORD",
};

const Login = ({ mode }: LoginState) => {
  const [error, setError] = useState(initialErrorState);
  const { isActive, errorMessage } = error;

  const handleErrorMessage = (errorMessage: string): void => {
    setError({ isActive: true, errorMessage: errorMessage });
  };

  if (mode === "login") {
    return (
      <PortalWrapper>
        <h1>Login</h1>
        <LoginForm handleErrorMessage={handleErrorMessage} />
        {isActive && <Error message={errorMessage} />}
        <Link to="./registration">Don't have an account? Create one here.</Link>
      </PortalWrapper>
    );
  } else if (mode === "registration") {
    return (
      <PortalWrapper>
        <h1>Registration</h1>
        <RegistrationForm handleErrorMessage={handleErrorMessage} />
        {isActive && <Error message={errorMessage} />}
        <Link to="./login">Have an account? Log in here.</Link>
      </PortalWrapper>
    );
  } else {
    return null;
  }
};

export default Login;
