import "./App.css";
import WorkoutPage from "./components/pages/WorkoutPage";
import Settings from "../src/components/pages/Settings";
import Header from "./components/ui/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <WorkoutPage />
      <Settings />
    </div>
  );
}

export default App;
