import "./App.css";
import Header from "./components/ui/Header";
import Workout from "./components/workout/Workout";

function App() {
  return (
    <div className="main">
      <Header />
      <section className="wrapper">
        <Workout />
      </section>
    </div>
  );
}

export default App;
