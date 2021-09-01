import ReactDOM from "react-dom";
import Card from "../../ui/Card";
import classes from "./SubmitPortalWrapper.module.css";

const SubmitPortalWrapper = (props) => {
  const domNode = document.getElementById("modal");
  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <Card className={classes.card}>{props.children}</Card>
    </div>,
    domNode
  );
};

export default SubmitPortalWrapper;
