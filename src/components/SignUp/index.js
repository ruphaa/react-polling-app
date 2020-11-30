import React, { useContext, useState } from "react";
import { RootContext } from "../RootContext";
import { Button } from "antd";

// Component in progress
const App = ({ closeModal }) => {
  const { dispatch } = useContext(RootContext);
  let defaultUser = { username: null, password: null };

  const [user, setUser] = useState(defaultUser);

  const createUser = function() {
    dispatch({
      type: "REGISTER",
      username: user.username,
      password: user.password
    });
    closeModal();
  };

  return (
    <div className="login-wrapper">
      <h2>Sign Up</h2>
      <div className="field name">
        <label>Enter the name</label>
        <input type="text" />
      </div>
      <div className="field username">
        <label>Enter the user id</label>
        <input
          type="text"
          value={user.username || ""}
          onChange={e => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div className="field password">
        <label>Enter your password</label>
        <input
          type="text"
          value={user.password || ""}
          onChange={e => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div className="btn-actions">
        <Button key="back" onClick={closeModal}>
          Cancel
        </Button>
        ,
        <Button key="submit" type="primary" onClick={createUser}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default App;
