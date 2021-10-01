import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes.header}>
      <ul className={classes.list}>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/workout">Workout</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
