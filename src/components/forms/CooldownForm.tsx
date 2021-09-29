interface Props {
  cooldown: number;
  cooldownHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CooldownForm = ({ cooldown, cooldownHandler }: Props) => {
  return (
    <label htmlFor="cooldown">
      Cooldown:
      <input
        value={cooldown}
        onChange={cooldownHandler}
        id="cooldown"
        type="number"
        name="cooldown"
      />
    </label>
  );
};

export default CooldownForm;
