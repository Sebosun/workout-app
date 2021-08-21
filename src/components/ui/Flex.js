import React from "react";
import classes from "./Flex.module.css";

const Flex = (props) => {
  return (
    <div className={classes.flexWrap}>
      <div className={`${classes.flex} ${props.column && classes.column}`}>
        {props.children}
      </div>
    </div>
  );
};

export default Flex;
