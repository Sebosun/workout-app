import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { changeErrorStatus } from "../../store/slices/ui-slice";

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
      className="absolute z-50 p-4 text-2xl text-center border-2 border-solid rounded-xl border-crimson bg-tetriary left-1/2 transform -translate-x-2/4 top-8"
    >
      <p className="capitalize pointer-events-none text-crimson">
        ERROR: {errorMessageTransformed}
      </p>
    </div>
  );
}
