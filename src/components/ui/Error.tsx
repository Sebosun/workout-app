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
      className="absolute top-8 left-1/2 z-50 p-4 text-2xl text-center rounded-xl border-2 border-solid transform -translate-x-2/4 border-crimson bg-tetriary"
    >
      <p className="capitalize pointer-events-none text-crimson">
        ERROR: {errorMessageTransformed}
      </p>
    </div>
  );
}
