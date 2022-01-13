import { useAuth } from "../../contexts/AuthContext";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOff from "./HeaderLoggedOff";

const Header = () => {
  const { currentUser: loggedIn }: any = useAuth();
  return (
    <header className="m-0 bg-gray-800 opacity-50">
      <ul className="flex max-w-xl p-2 mx-auto overflow-x-scroll gap-10 md:overflow-x-auto md:justify-around xl:justify-end">
        {loggedIn && <HeaderLoggedIn />}
        {!loggedIn && <HeaderLoggedOff />}
      </ul>
    </header>
  );
};

export default Header;
