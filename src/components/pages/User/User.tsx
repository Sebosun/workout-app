import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function User(): ReactElement | null {
  const linkClasses =
    "flex sm:flex-row items-center self-center justify-center h-48 text-4xl border-2 border-solid text-center max-w-sm lg:max-w-lg rounded-xl btn";

  return (
    <div className="grid object-center gap-4 justify-center place-content-stretch p-2 my-32 mx-auto max-w-4xl sm:grid-cols-2 lg:my-52 grid-row-2 xl">
      <Link to="/user/add-workout" className={`${linkClasses}`}>
        Add workout template
      </Link>
      <Link to="/user/custom-templates" className={`${linkClasses}`}>
        Check your templates
      </Link>
    </div>
  );
}
