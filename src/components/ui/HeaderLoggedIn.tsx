import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import { IoIosLogOut } from "react-icons/io";

export default function HeaderLoggedIn(): ReactElement | null {
  const { logout }: any = useAuth();
  const history = useHistory();

  const handleLogout = async (): Promise<void> => {
    //TODO confirmation if you really want to logout
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
      <li className="text-xl self-center">
        <Link to="/workout">Workout</Link>
      </li>
      <li className="text-xl self-center">
        <Link to="/settings">Settings</Link>
      </li>
      <li className="solid self-center">
        <IoIosLogOut
          role="button"
          onClick={handleLogout}
          className="cursor-pointer hover:text-purple-500 text-2xl"
        />
      </li>
    </>
  );
}
