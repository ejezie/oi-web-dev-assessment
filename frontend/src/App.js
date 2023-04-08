import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./routes/routesConfig";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <RouterConfig />
      </BrowserRouter>
    </div>
  );
}

export default App;
