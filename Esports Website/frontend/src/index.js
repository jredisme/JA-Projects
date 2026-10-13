import React from "react";
import ReactDOM from "react-dom/client";
import "./views/App/custom.scss";
import App from "./views/App/App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);