import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, DefaultTheme } from "styled-components";
import App from "./App";

const darkTheme: DefaultTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};

const lightTheme: DefaultTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
