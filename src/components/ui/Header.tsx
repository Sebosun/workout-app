import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOff from "./HeaderLoggedOff";

const Header = () => {
  const { currentUser: loggedIn }: any = useAuth();

  return (
    <header className={classes.header}>
      <ul className={classes.list}>
        <li>
          <Link to="/">Main</Link>
        </li>
        {loggedIn && <HeaderLoggedIn />}
        {!loggedIn && <HeaderLoggedOff />}
      </ul>
    </header>
  );
};

export default Header;
