import LoginForm from "../forms/user/LoginForm";
import RegistrationForm from "../forms/user/RegistrationForm";
import PortalWrapper from "../ui/PortalWrapper";

interface LoginState {
  mode: "login" | "registration";
}

// TODO this one will have to be reworked too, unnecessary
const Login = ({ mode }: LoginState) => {
  if (mode === "login") {
    return <LoginForm />;
  } else if (mode === "registration") {
    return <RegistrationForm />;
  } else {
    return null;
  }
};

export default Login;
