import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import axios from "axios";

import "./index.css";
import App from "./App.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>,
);
