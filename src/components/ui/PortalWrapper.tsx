import { useState } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router";
import Card from "./Card";
import classes from "./PortalWrapper.module.css";

interface PortalWrapperProps {
  children?: React.ReactNode;
  location?: string;
}

const domNode = document.getElementById("modal") as HTMLElement;

/** Wrapper for a portal popup */

const PortalWrapper = ({ children, location }: PortalWrapperProps) => {
  const [display, setDisplay] = useState(true);

  if (location === undefined) {
    location = "/main";
  }

  const handleDisplay = () => {
    setDisplay((prev) => !prev);
  };

  if (!display) {
    return <Redirect to={`${location}`} />;
  } else {
    return ReactDOM.createPortal(
      <div>
        <div onClick={handleDisplay} className={classes.modal} />
        <div className={`${classes.card} bg-gray-900`}>{children}</div>
      </div>,
      domNode
    );
  }
};

export default PortalWrapper;
