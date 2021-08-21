import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Flex from "../ui/Flex";

const NotFound = (props) => {
  const [redirect, setRedirect] = useState(null);

  setTimeout(() => {
    setRedirect(<Redirect to="/main" />);
  }, 4000);

  return (
    <Flex column={true}>
      <h1>Page not found</h1>
      <p> You will be redirected to the main page shortly</p>
      <p>
        Dolor eligendi dolorum voluptatibus eaque vero Culpa esse quam optio
        repellat molestiae. Quisquam corrupti sapiente sapiente exercitationem
        beatae Neque autem dignissimos ratione qui optio Recusandae dolorem
        consequuntur distinctio tempora sint.
      </p>

      {/* {redirect} */}
    </Flex>
  );
};

export default NotFound;
