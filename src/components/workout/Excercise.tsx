// for clarity
//   sets - how many series (loops) are there
//   reps - how many repetitions of loops are there
//   ex: 3 sets 8 reps => 3 * 8 => 3 times lift heavy thing 8 times in a row

interface Props {
  index: number;
  sets: number[];
  completed: boolean[];
  reps: number;
  setsHandler: (index: number, position: number) => void;
}

const btnActive =
  "w-14 h-14 lg:w-20 lg:h-20 rounded-2xl text-2xl lg:text-4xl bg-purple-800 pointer";
const btnDisabled =
  "w-14 h-14 lg:w-20 lg:h-20 rounded-2xl text-2xl lg:text-4xl bg-gray-800 pointer hover:bg-purple-900";

const Exercise = (props: Props) => {
  /** given the amount of sets, creates array of buttons with
   * onClick property that handles set behaviour */
  const setsRender = (amount: number): JSX.Element[] => {
    let setsArr: JSX.Element[] = [];
    for (let i = 0; i < amount; i++) {
      setsArr.push(
        <button
          key={i}
          onClick={() => {
            props.setsHandler(props.index, i);
          }}
          className={`${props.completed[i] ? btnActive : btnDisabled}`}
        >
          {props.sets[i]}
        </button>
      );
    }
    return setsArr;
  };

  const sets = setsRender(props.sets.length);

  return <div className="flex flex-wrap gap-2 justify-center">{sets}</div>;
};

export default Exercise;
