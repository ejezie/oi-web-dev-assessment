import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./routes/routesConfig";
import { Provider } from "react-redux";
import {store} from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
