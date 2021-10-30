import "./App.css";
import Header from "./components/ui/Header";

import Routing from "./components/pages/Routing";
import InitialState from "./components/wrappers/state/InitialState";
import Error from "./components/ui/Error";
import { useAppSelector } from "./store/app/hooks";
import { AuthProvider } from "./contexts/AuthContext";
import Success from "./components/ui/Success";

function App() {
  const errorStatus= useAppSelector((state) => state.ui.error.status);
  const successStatus= useAppSelector((state) => state.ui.success.status);

  return (
    <div className="h-full p-0 m-0">
      <AuthProvider>
        {errorStatus && <Error />}
        {successStatus && <Success />}
        <Header />
        <Routing />
        <InitialState />
      </AuthProvider>
    </div>
  );
} export default App;
