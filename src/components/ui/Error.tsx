import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { changeErrorStatus } from "../../store/slices/ui-slice";
import classes from "./Error.module.css";

export interface ErrorProps {
  message: string;
}

export default function Error(): ReactElement | null {
  const errorData = useAppSelector((state) => state.ui.error);
  const { message } = errorData;
  const dispatch = useAppDispatch();
  const errorMessageTransformed = message.replace("_", " ").toLowerCase();

  const hideErrorMessage = () => {
    dispatch(changeErrorStatus());
  };

  return (
    <div onClick={hideErrorMessage} className={classes.error}>
      <p>Error: {errorMessageTransformed}</p>
    </div>
  );
}
