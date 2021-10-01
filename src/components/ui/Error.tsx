import { ReactElement } from "react";
import classes from "./Error.module.css";

export interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps): ReactElement | null {
  const errorMessageTransformed = message.replace("_", " ").toLowerCase();

  return (
    <div className={classes.error}>
      <p>Error: {errorMessageTransformed}</p>
    </div>
  );
}
