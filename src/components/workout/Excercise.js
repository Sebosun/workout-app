import classes from "./Excercise.module.css";

// for clarity
//   sets - how many series (loops) are there
//   reps - how many repetitions of loops are there
//   ex: 3 sets 8 reps => 3 * 8 => 3 times lift heavy thing 8 times in a row

const Exercise = (props) => {
  const setsRender = (amount) => {
    let setsArr = [];
    for (let i = 0; i < amount; i++) {
      setsArr.push(
        <button
          key={i}
          onClick={() => {
            props.setsHandler(props.index, i);
          }}
          className={`${classes.rep} ${
            props.completed[i] ? null : classes.disabled
          }`}
        >
          {props.sets[i]}
        </button>
      );
    }
    return setsArr;
  };

  const sets = setsRender(props.sets.length);

  return <div className={classes.sets}>{sets}</div>;
};

export default Exercise;
