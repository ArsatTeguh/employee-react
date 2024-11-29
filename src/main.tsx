import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import ".//Common//axios.tsx";
import App from "./App.tsx";
import "./Styles/index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Fragment>
    <App />
  </Fragment>
);
