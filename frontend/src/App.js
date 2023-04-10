import "./App.scss";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./routes/routesConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { loadUserAction } from "./redux/slices/user.slice";

function App() {

  React.useEffect(() => {
    store.dispatch(loadUserAction());
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
