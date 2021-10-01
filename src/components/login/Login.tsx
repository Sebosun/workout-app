import { useState } from "react";
import LoginForm from "../forms/user/LoginForm";
import RegistrationForm from "../forms/user/RegistrationForm";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return <>{loggedIn && <LoginForm />}</>;
};

export default Login;
