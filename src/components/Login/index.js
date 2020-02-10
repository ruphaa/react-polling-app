import React, { useContext } from "react";
import { RootContext } from "../RootContext";

// Component in progress
const App = ({ closeModal }) => {
  const { authenticated, setAuthenticated } = useContext(RootContext);
  const loginUser = function() {
    setAuthenticated(true);
    closeModal();
  };
  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      <div className="username">
        <label>Enter the user id</label>
        <input type="text" />
      </div>
      <div className="password">
        <label>Enter your password</label>
        <input type="text" />
      </div>
      <button onClick={loginUser}>Submit</button>
    </div>
  );
};

export default App;
