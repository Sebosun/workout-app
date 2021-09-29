import ReactDOM from "react-dom";
import Card from "../../ui/Card";
import classes from "./SubmitPortalWrapper.module.css";

const domNode = document.getElementById("modal") as HTMLElement;

/** Wrapper for a portal popup */

const SubmitPortalWrapper = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <Card className={classes.card}>{children}</Card>
    </div>,
    domNode
  );
};

export default SubmitPortalWrapper;
