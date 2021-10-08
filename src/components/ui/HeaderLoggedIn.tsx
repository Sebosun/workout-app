import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";

export default function HeaderLoggedIn(): ReactElement | null {
  const { logout }: any = useAuth();
  const history = useHistory();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      history.push("/");
    } catch {
      throw new Error("cos sie zjebało");
    }
  };

  // that button will be stylized later after i get around implementing tailwind
  return (
    <>
      <li>
        <Link to="/workout">Workout</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  );
}
