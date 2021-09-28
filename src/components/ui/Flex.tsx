import React from "react";
import classes from "./Flex.module.css";

interface Props {
  column: boolean;
  children: React.ReactNode;
}

const Flex = (props: Props) => {
  return (
    <div className={classes.flexWrap}>
      <div className={`${classes.flex} ${props.column && classes.column}`}>
        {props.children}
      </div>
    </div>
  );
};

export default Flex;
