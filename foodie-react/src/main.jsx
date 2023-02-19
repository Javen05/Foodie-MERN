import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import './index.css'

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import "@fontsource/open-sans";
import "@fontsource/recursive";
import theme from "./theme";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </Router>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
