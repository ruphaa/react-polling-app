import React, { useContext } from "react";
import { RootContext } from "../RootContext";
import "./style.css";

// Component in progress
const App = ({ closeModal }) => {
  // const { authenticated, setAuthenticated } = useContext(RootContext);

  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      <div className="field username">
        <label>Enter the user id</label>
        <input type="text" />
      </div>
      <div className="field password">
        <label>Enter your password</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default App;
