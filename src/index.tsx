// Importing necessary libraries and components.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Importing styles for PrimeReact, a UI library for React.
// The theme being used here is 'soho-dark'.
import "primereact/resources/themes/soho-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// Creating a root using ReactDOM's concurrent mode.
// This enables certain experimental features in React.
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

// Rendering the main App component inside the root.
// The use of StrictMode here helps highlight potential problems in the app.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// `reportWebVitals` function is used for logging or analyzing performance in your application.
// It can be used in combination with logging to the console or sending to an analytics endpoint.
reportWebVitals();
