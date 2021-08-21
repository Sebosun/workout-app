import React from "react";

const CooldownForm = (props) => {
  return (
    <label htmlFor="cooldown">
      Cooldown:
      <input
        value={props.cooldown}
        onChange={props.cooldownHandler}
        type="number"
        name="cooldown"
      />
    </label>
  );
};

export default CooldownForm;
