import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { changeSuccessStatus } from "../../store/slices/ui-slice";

export default function Success(): ReactElement | null {
  const successData = useAppSelector((state) => state.ui.success);
  const { message } = successData;

  const dispatch = useAppDispatch();
  const successMessageTransformed = message.replace("_", " ").toLowerCase();

  const hideSuccessMessage = () => {
    dispatch(changeSuccessStatus());
  };

  return (
    <div
      onClick={hideSuccessMessage}
      className="absolute z-50 p-4 text-2xl text-center bg-green-700 border-2 border-black text-gray-900 border-solid rounded-xl left-1/2 transform -translate-x-2/4 top-8"
    >
      <p className="capitalize pointer-events-none">
        {successMessageTransformed}
      </p>
    </div>
  );
}
