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
    <div
      onClick={hideErrorMessage}
      className="border-2 p-4 rounded-xl border-crimson border-solid absolute z-50 bg-tetriary text-2xl left-1/2 transform -translate-x-2/4 top-8 text-center"
    >
      <p className="capitalize pointer-events-none text-crimson">
        ERROR: {errorMessageTransformed}
      </p>
    </div>
  );
}
