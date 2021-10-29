import classes from "./Header.module.css"; import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOff from "./HeaderLoggedOff";

const Header = () => {
  const { currentUser: loggedIn }: any = useAuth();
  //TODO add underline to indicate which path is active at the moment

  return (
    <header className="m-0 bg-purple-900 border-b-2 border-gray-400 ">
      <ul className="flex justify-end p-4 mx-4 overflow-y-scrol gap-10">
        <li className="text-xl border-b-2 border-transparent outline-none hover:border-gray-400 hover:border-current">
          <Link to="/">Main</Link>
        </li>
        {loggedIn && <HeaderLoggedIn />}
        {!loggedIn && <HeaderLoggedOff />}
      </ul>
    </header>
  );
};

export default Header;
