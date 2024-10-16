import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/main.scss";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/saga-orange/theme.css";

import "primeicons/primeicons.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  // </StrictMode>
);
