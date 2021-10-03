import "./App.css";
import Header from "./components/ui/Header";

import Routing from "./components/pages/Routing";
import InitialState from "./components/wrappers/InitialState";
import Error from "./components/ui/Error";
import { useAppSelector } from "./store/app/hooks";

function App() {
  const { status } = useAppSelector((state) => state.ui.error);

  return (
    <div className="app">
      {status && <Error />}
      <Header />
      <Routing />
      <InitialState />
    </div>
  );
}

export default App;
