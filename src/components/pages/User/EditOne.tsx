import React, { ReactElement } from "react";
import { useHistory, useLocation } from "react-router";
import { useAppSelector } from "../../../store/app/hooks";
import Edit from "../../forms/workout/Edit";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function EditOne(): ReactElement | null {
  const query = useQuery();
  const dupa = +(query.get("index") || 0);
  const location = useLocation();
  const history = useHistory();
  const { template } = useAppSelector((state) => state.edit);
  const curTempl = template[dupa];

  return (
    <div className="max-w-md mx-auto">
      <Edit
        name={curTempl.name}
        sets={curTempl.sets}
        reps={curTempl.reps}
        weight={curTempl.weight}
      />
    </div>
  );
}
