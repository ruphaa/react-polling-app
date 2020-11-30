import React, { useContext } from "react";
import { RootContext } from "../RootContext";
import { Layout } from "antd";
const { Header } = Layout;

const App = ({ showPollFormModal, showLoginModal, showVisibleSignUpForm }) => {
  const { authenticated, dispatch } = useContext(RootContext);

  return (
    <Header>
      <div className="heading">Voting Polls</div>
      {authenticated ? (
        <div className="heading-menu">
          <button
            className="btn-primary"
            onClick={() => dispatch({ type: "LOGOUT" })}
          >
            Logout
          </button>
          <button className="btn-primary" onClick={showPollFormModal}>
            Create a Poll
          </button>
        </div>
      ) : (
        <div className="heading-menu">
          <button className="btn-primary" onClick={showLoginModal}>
            Login
          </button>
          <button className="btn-primary" onClick={showVisibleSignUpForm}>
            Sign Up
          </button>
        </div>
      )}
    </Header>
  );
};

export default App;
