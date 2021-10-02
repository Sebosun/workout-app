import "./App.css";
import Header from "./components/ui/Header";

import Routing from "./components/pages/Routing";
import InitialState from "./components/wrappers/InitialState";

function App() {
  return (
    <div className="app">
      <Header />
      <Routing />
      <InitialState />
    </div>
  );
}

export default App;
