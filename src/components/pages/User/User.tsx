import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function User(): ReactElement | null {
  const linkClasses =
    "flex sm:flex-row items-center self-center justify-center p-4 h-48 text-4xl border-2 border-solid text-center max-w-sm lg:max-w-lg rounded-xl btn";

  return (
    <div className="justify-center object-center max-w-4xl p-8 mx-auto grid gap-4 place-content-stretch grid-rows-2">
      <Link to="/user/add-workout" className={`${linkClasses}`}>
        Add workout template
      </Link>
      <Link to="/user/custom-templates" className={`${linkClasses}`}>
        Check your templates
      </Link>
    </div>
  );
}
