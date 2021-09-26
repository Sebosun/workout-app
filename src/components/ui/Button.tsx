import React from "react";
import classes from "./Button.module.css";

const Button: React.FC<{
  onClick: () => void;
  style: object;
  className: string;
}> = (props): JSX.Element => {
  return (
    <button
      onClick={props.onClick}
      style={props.style}
      className={`${props.className} ${classes.button}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
