import React, { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

export default function HeaderLoggedOff(): ReactElement | null {
  const location = useLocation();
  const locationSplit = location.pathname.split("/");

  return (
    <React.Fragment>
      <li
        className={`header-el ${
          locationSplit.length === 0 && " text-green-400"
        }`}
      >
        <Link to="/">Main</Link>
      </li>
      <li
        className={`header-el ${
          locationSplit[1] === "login" && "text-green-400"
        }`}
      >
        <Link to="/login">Login</Link>
      </li>
    </React.Fragment>
  );
}
