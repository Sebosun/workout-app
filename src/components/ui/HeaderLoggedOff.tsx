import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function HeaderLoggedOff(): ReactElement | null {
  return (
    <React.Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </React.Fragment>
  );
}
