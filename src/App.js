import React, { useState, useEffect } from "react";
import PollList from "./components/PollList";
import { RootContext } from "./components/RootContext.js";

function App() {
  const defaultLogin =
    window.localStorage.getItem("authenticated") == "true" || false;

  const [authenticated, setAuthenticated] = useState(defaultLogin);

  useEffect(() => {
    window.localStorage.setItem("authenticated", authenticated);
  });

  return (
    <RootContext.Provider value={{ authenticated, setAuthenticated }}>
      <div className="App">
        <PollList />
      </div>
    </RootContext.Provider>
  );
}
export default App;
