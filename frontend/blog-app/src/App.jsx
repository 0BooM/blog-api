import "./App.css";
import Navbar from "./components/Navbar";
import routes from "./routes";
import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
