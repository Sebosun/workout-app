import "./App.css";
import Excercise from "./components/workout/Excercise";
import Workout from "./components/workout/Workout";

function App() {
  return (
    <div className="main">
      <section className="wrapper">
        <Workout />
      </section>
    </div>
  );
}

export default App;
