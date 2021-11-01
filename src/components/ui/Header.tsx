import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOff from "./HeaderLoggedOff";

const Header = () => {
  const { currentUser: loggedIn }: any = useAuth();
  //TODO add underline to indicate which path is active at the moment

  return (
    <header className="m-0 bg-purple-900 border-b-2 border-gray-400">
      <ul className="flex gap-10 overflow-x-scroll md:overflow-x-auto md:justify-around xl:justify-end p-4 mx-4">
        {loggedIn && <HeaderLoggedIn />}
        {!loggedIn && <HeaderLoggedOff />}
      </ul>
    </header>
  );
};

export default Header;
