import "./App.css";
import Header from "./components/ui/Header";
import { useEffect } from "react";

import Routing from "./components/pages/Routing";
import InitialState from "./components/Wrappers/InitialState";

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
