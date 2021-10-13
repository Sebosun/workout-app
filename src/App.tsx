import "./App.css";
import Header from "./components/ui/Header";

import Routing from "./components/pages/Routing";
import InitialState from "./components/wrappers/InitialState";
import Error from "./components/ui/Error";
import { useAppSelector } from "./store/app/hooks";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const { status } = useAppSelector((state) => state.ui.error);

  return (
    <div className="p-0 m-0 h-full">
      <AuthProvider>
        {status && <Error />}
        <Header />
        <Routing />
        <InitialState />
      </AuthProvider>
    </div>
  );
} export default App;
