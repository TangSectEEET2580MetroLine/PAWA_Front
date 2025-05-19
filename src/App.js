import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./auth/state/AuthProvider";
import RouteConfig from "./route/config/RouteConfig";

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteConfig />
      </Router>
    </AuthProvider>
  );
}

export default App;
