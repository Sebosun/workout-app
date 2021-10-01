import { useState } from "react";
import LoginForm from "../forms/user/LoginForm";
import RegistrationForm from "../forms/user/RegistrationForm";
import PortalWrapper from "../ui/PortalWrapper";
import Error from "../ui/Error";

interface ErrorState {
  isActive: boolean;
  errorMessage: string;
}

const initialErrorState: ErrorState = {
  isActive: false,
  errorMessage: "INVALID_PASSWORD",
};

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [error, setError] = useState(initialErrorState);
  const { isActive, errorMessage } = error;

  const handleErrorMessage = (errorMessage: string): void => {
    setError({ isActive: true, errorMessage: errorMessage });
  };

  return (
    <>
      <PortalWrapper>
        {loggedIn && <LoginForm handleErrorMessage={handleErrorMessage} />}
        {isActive && <Error message={errorMessage} />}
      </PortalWrapper>
    </>
  );
};

export default Login;
