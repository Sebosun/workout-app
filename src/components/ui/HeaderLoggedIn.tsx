import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory, useLocation } from "react-router";
import { IoIosLogOut } from "react-icons/io";
import PortalWrapper from "./PortalWrapper";

export default function HeaderLoggedIn(): ReactElement | null {
  const { logout }: any = useAuth();
  const history = useHistory();
  const location = useLocation();

  const locationSplit = location.pathname.split("/")[1];
  const [confirmation, setConfirmation] = useState(false);

  const handleLogout = async (): Promise<void> => {
    try {
      // TODO: clear workout data at logout maybe
      await logout();
      history.push("/");
    } catch {
      throw new Error("An error has occurred");
    }
  };

  const handleLogoutConfirmed = () => {
    handleLogout();
  };

  const handleConfirmLogout = () => {
    setConfirmation((prev) => !prev);
  };

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
        className={`header-el ${locationSplit === "user" && "text-green-400"}`}
      >
        <Link to="/user">User</Link>
      </li>
      <li
        className={`header-el ${
          locationSplit === "settings" && "text-green-400"
        }`}
      >
        <Link to="/settings">Settings</Link>
      </li>
      <li className={"header-el self-center"}>
        <IoIosLogOut
          role="button"
          onClick={handleConfirmLogout}
          className="text-3xl cursor-pointer hover:text-purple-500 hover:border-current"
        />
      </li>
      {confirmation && (
        <PortalWrapper>
          <h1>Are you sure you want to log out?</h1>
          <button onClick={handleLogoutConfirmed} className="btn-del">
            Yes
          </button>
          <button onClick={handleConfirmLogout} className="btn-pos">
            No
          </button>
        </PortalWrapper>
      )}
    </>
  );
}
