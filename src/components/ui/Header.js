import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <ul className={classes.list}>
        <li>Main</li>
        <li>Workout</li>
        <li>Options</li>
      </ul>
    </header>
  );
};

export default Header;
