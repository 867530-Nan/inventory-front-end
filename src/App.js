import React from "react";
import Router from "./Router";
import RootProvider from "./contexts/RootProvider";

function App() {
  return (
    <RootProvider>
      <Router />
    </RootProvider>
  );
}

export default App;
