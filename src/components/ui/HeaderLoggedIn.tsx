import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory, useLocation } from "react-router";
import { IoIosLogOut } from "react-icons/io";

export default function HeaderLoggedIn(): ReactElement | null {
  const { logout }: any = useAuth();
  const history = useHistory();
  const location = useLocation();

  const locationSplit = location.pathname.split("/")[1];

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
      <li
        className={`header-el ${
          locationSplit === "dashboard" && "text-green-400"
        }`}
      >
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li
        className={`header-el ${
          locationSplit === "workout" && "text-green-400"
        }`}
      >
        <Link to="/workout">Workout</Link>
      </li>
      <li
        className={`header-el ${
          locationSplit === "settings" && "text-green-400"
        }`}
      >
        <Link to="/settings">Settings</Link>
      </li>
      <li
        className={`header-el ${locationSplit === "user" && "text-green-400"}`}
      >
        <Link to="/user">User</Link>
      </li>
      <li className={"header-el self-center"}>
        <IoIosLogOut
          role="button"
          onClick={handleLogout}
          className="text-3xl cursor-pointer hover:text-purple-500 hover:border-current"
        />
      </li>
    </>
  );
}
