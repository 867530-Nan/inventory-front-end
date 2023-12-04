import React from "react";
import Router from "./Router";
import RootProvider from "./contexts/RootProvider";
import "./App.css";

function App() {
  return (
    <RootProvider>
      <Router />
    </RootProvider>
  );
}

export default App;
