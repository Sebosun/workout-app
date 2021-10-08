import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { currentUser: loggedIn }: any = useAuth();

  return (
    <header className={classes.header}>
      <ul className={classes.list}>
        <li>
          <Link to="/">Main</Link>
        </li>
        {loggedIn && (
          <>
            <li>
              <Link to="/workout">Workout</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </>
        )}
        {!loggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
