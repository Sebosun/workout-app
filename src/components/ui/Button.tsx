import React from "react";
import classes from "./Button.module.css";

interface Props {
  onClick?: (() => void) | (() => Promise<void>);
  style?: object;
  className?: string;
  children: React.ReactNode;
}

const Button = (props: Props) => {
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
