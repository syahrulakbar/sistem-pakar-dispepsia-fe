import { Provider } from "react-redux";
import store from "./config/Redux/store";
import { BrowserRouter } from "react-router-dom";
import Router from "./config/Routes/Router";
import ToasterProvider from "./utils/ToasterProvider";

function App() {
  return (
    <Provider store={store}>
      <ToasterProvider />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
