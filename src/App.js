import React, { useState, useEffect, useReducer } from "react";
import PollList from "./components/PollList";
import { RootContext } from "./components/RootContext.js";

function App() {
  const defaultUsers =
    (window.localStorage.getItem("users") &&
      JSON.parse(window.localStorage.getItem("users"))) ||
    [];

  const defaultAuth =
    window.localStorage.getItem("authenticated") == "true" || false;

  const userReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        let user = state.filter(
          (user) =>
            user.username == action.username && user.password == action.password
        );
        setAuthenticated(!!user.length);
        return state;
      case "LOGOUT":
        setAuthenticated(false);
        return state;
      case "REGISTER":
        setAuthenticated(true);
        return [
          ...state,
          {
            username: action.username,
            password: action.password,
          },
        ];
      default:
        return state;
    }
  };

  const [authenticated, setAuthenticated] = useState(defaultAuth);
  const [users, dispatch] = useReducer(userReducer, defaultUsers);

  useEffect(() => {
    window.localStorage.setItem("authenticated", authenticated);
    window.localStorage.setItem("users", JSON.stringify(users));
  });

  let defaultContext = {
    authenticated,
    setAuthenticated,
    users,
    dispatch,
  };

  return (
    <RootContext.Provider value={defaultContext}>
      <div className="App">
        <PollList />
      </div>
    </RootContext.Provider>
  );
}

export default App;
