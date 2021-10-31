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
      // TODO: clear workout data at logout maybe
      await logout();
      history.push("/");
    } catch {
      throw new Error("An error has occurred");
    }
  };

  // that button will be stylized later after i get around implementing tailwind
  return (
    <>
      <li className="text-xl border-b-2 border-transparent outline-none hover:border-current hover:border-gray-400">
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li className="text-xl border-b-2 border-transparent outline-none hover:border-current hover:border-gray-400">
        <Link to="/workout">Workout</Link>
      </li>
      <li className="text-xl border-b-2 border-transparent outline-none hover:border-current hover:border-gray-400">
        <Link to="/settings">Settings</Link>
      </li>
      <li className="text-xl border-b-2 border-transparent outline-none hover:border-current hover:border-gray-400">
        <Link to="/user">User</Link>
      </li>
      <li className="text-xl border-b-2 border-transparent outline-none hover:border-current hover:border-gray-400">
        <IoIosLogOut
          role="button"
          onClick={handleLogout}
          className="text-2xl cursor-pointer hover:text-purple-500 hover:border-current"
        />
      </li>
    </>
  );
}
