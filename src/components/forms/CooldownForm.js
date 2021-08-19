import { useState } from "react";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../store/settings-slice";

const CooldownForm = (props) => {
  const rdxCd = useSelector((state) => state.settings.cooldown);
  const [cooldown, setCooldown] = useState(rdxCd);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(settingsActions.changeCooldown(cooldown));
  };

  const cooldownHandler = (e) => {
    setCooldown(e.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="cooldown">
        Cooldown:
        <input
          value={cooldown}
          onChange={cooldownHandler}
          type="number"
          name="cooldown"
        />
      </label>
      <Button>Submit</Button>
    </form>
  );
};

export default CooldownForm;
