import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const NotFound = (props) => {
  const [redirect, setRedirect] = useState(null);

  setTimeout(() => {
    setRedirect(<Redirect to="/main" />);
  }, 1000);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Page not found</h1>
      <p> You will be redirected to the main page shortly</p>
      {redirect}
    </div>
  );
};

export default NotFound;
