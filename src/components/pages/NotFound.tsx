import { useState } from "react";
import { Redirect } from "react-router-dom";
import Flex from "../ui/Flex";

const NotFound = () => {
  const [redirect, setRedirect] = useState<React.ReactElement>();

  setTimeout(() => {
    setRedirect(<Redirect to="/" />);
  }, 4000);

  return (
    <div className="flex flex-col">
      <h1>Page not found</h1>
      <p> You will be redirected to the main page shortly</p>
      <p>
        Dolor eligendi dolorum voluptatibus eaque vero Culpa esse quam optio
        repellat molestiae. Quisquam corrupti sapiente sapiente exercitationem
        beatae Neque autem dignissimos ratione qui optio Recusandae dolorem
        consequuntur distinctio tempora sint.
      </p>

      {redirect}
    </div>
  );
};

export default NotFound;
