import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function HeaderLoggedOff(): ReactElement | null {
  return (
    <React.Fragment>
      <li className="self-center text-xl border-b-2 border-transparent outline-none hover:border-gray-400 hover:border-current">
        <Link to="/login">Login</Link>
      </li>
    </React.Fragment>
  );
}
