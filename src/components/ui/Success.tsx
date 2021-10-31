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
      className="absolute top-8 left-1/2 z-50 p-4 text-2xl text-center text-gray-900 bg-green-700 rounded-xl border-2 border-black border-solid transform -translate-x-2/4"
    >
      <p className="capitalize pointer-events-none">
        {successMessageTransformed}
      </p>
    </div>
  );
}
