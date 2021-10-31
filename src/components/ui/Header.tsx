import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOff from "./HeaderLoggedOff";

const Header = () => {
  const { currentUser: loggedIn }: any = useAuth();
  //TODO add underline to indicate which path is active at the moment

  return (
    <header className="m-0 bg-purple-900 border-b-2 border-gray-400">
      <ul className="flex gap-10 justify-end p-4 mx-4 overflow-y-scrol">
        {loggedIn && <HeaderLoggedIn />}
        {!loggedIn && <HeaderLoggedOff />}
      </ul>
    </header>
  );
};

export default Header;
