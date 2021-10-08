import LoginForm from "../forms/user/LoginForm";
import RegistrationForm from "../forms/user/RegistrationForm";
import PortalWrapper from "../ui/PortalWrapper";
import { Link } from "react-router-dom";

interface LoginState {
  mode: "login" | "registration";
}

// TODO this one will have to be reworked too, unnecessary
const Login = ({ mode }: LoginState) => {
  if (mode === "login") {
    return (
      <PortalWrapper>
        <h1>Login</h1>
        <LoginForm />
        <Link to="./registration">Don't have an account? Create one here.</Link>
      </PortalWrapper>
    );
  } else if (mode === "registration") {
    return (
      <PortalWrapper>
        <h1>Registration</h1>
        <RegistrationForm />
        <Link to="./login">Have an account? Log in here.</Link>
      </PortalWrapper>
    );
  } else {
    return null;
  }
};

export default Login;
