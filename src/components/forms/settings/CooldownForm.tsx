interface Props {
  cooldown: number;
  cooldownHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CooldownForm = ({ cooldown, cooldownHandler }: Props) => {
  return (
    <>
      <label className="block" htmlFor="cooldown">
        Cooldown:
      </label>
      <input
        value={cooldown}
        onChange={cooldownHandler}
        className="bg-gray-500"
        id="cooldown"
        type="number"
        name="cooldown"
      />
    </>
  );
};

export default CooldownForm;
