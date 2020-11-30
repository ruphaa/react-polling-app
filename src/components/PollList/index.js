import React, { useState, useEffect, useReducer, useContext } from "react";
import Poll from "../Poll";
import Header from "../Header";
import { RootContext } from "../RootContext.js";
import { Modal, Button, Layout } from "antd";
import Login from "../Login";
import SignUp from "../SignUp";
import Form from "../Form";

import "./style.css";
import { PollContext } from "../RootContext";

const { Content } = Layout;

const App = () => {
  // States
  const { user, setUser } = useContext(RootContext);

  // Local State for handling Modals
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visiblePollForm, setVisiblePollForm] = useState(false);
  const [visibleSignUpForm, setVisibleSignUpForm] = useState(false);

  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  // const childRef = useRef();

  // Modal Functionalities
  const showLoginModal = () => setVisibleLogin(true);
  const closeLoginModal = () => setVisibleLogin(false);

  const showPollFormModal = () => setVisiblePollForm(true);
  const closePollFormModal = () => setVisiblePollForm(false);

  const showVisibleSignUpForm = () => setVisibleSignUpForm(true);
  const closeVisibleSignUpForm = () => setVisibleSignUpForm(false);

  const initialPolls = [
    {
      id: Date.now(),
      title: "Have you been crazy lately?",
      closed: false,
      choices: [
        {
          id: Date.now() + "yes",
          value: "Yes",
          count: 0
        },
        {
          id: Date.now() + "no",
          value: "No",
          count: 0
        },
        {
          id: Date.now() + "wc",
          value: "Who cares",
          count: 0
        }
      ]
    },
    {
      id: Date.now() + 1,
      title: "Do we all need a friends reunion?",
      closed: false,
      choices: [
        {
          id: Date.now() + "yes",
          value: "Yes",
          count: 0
        },
        {
          id: Date.now() + "no",
          value: "No",
          count: 0
        }
      ]
    }
  ];

  const defaultPoll =
    JSON.parse(window.localStorage.getItem("polls")) || initialPolls;

  const pollReducer = (state, action) => {
    switch (action.type) {
      case "DELETE_POLL":
        return state.filter(poll => poll.id !== action.id);
      case "CREATE_POLL":
        return [...state, action.newPoll];
      case "CLOSE_POLL":
        return state.map(poll =>
          poll.id === action.id ? action.updatedPoll : poll
        );
      case "VOTE_POLL":
        return state.map(poll =>
          poll.id == action.id ? action.updatedPoll : poll
        );
      case "EDIT_POLL":
        debugger;
        return state.map(poll =>
          poll.id === action.id ? action.updatedPoll : poll
        );
      default:
        return state;
    }
  };

  const [polls, dispatch] = useReducer(pollReducer, defaultPoll);

  useEffect(() => {
    window.localStorage.setItem("polls", JSON.stringify(polls));
  });

  return (
    <PollContext.Provider value={{ polls, dispatch }}>
      <React.Fragment>
        <Layout>
          <Header
            showLoginModal={showLoginModal}
            showPollFormModal={showPollFormModal}
            showVisibleSignUpForm={showVisibleSignUpForm}
          />
          <Content>
            <ul className="poll-list">
              {polls.map(poll => (
                <Poll poll={poll} />
              ))}
            </ul>
            {/* Login Modal */}
            <Modal
              visible={visibleLogin}
              contentLabel="Login"
              onCancel={closeLoginModal}
              destroyOnClose={true}
              footer={[]}
            >
              <Login closeModal={closeLoginModal} />
            </Modal>
            {/* Create a Poll */}
            <Modal
              visible={visiblePollForm}
              contentLabel="Create a Poll"
              onCancel={closePollFormModal}
              destroyOnClose={true}
              footer={[]}
            >
              <Form closeModal={closePollFormModal} />
            </Modal>
            {/* Sign Up modal */}
            <Modal
              visible={visibleSignUpForm}
              contentLabel="Login"
              onCancel={closeVisibleSignUpForm}
              destroyOnClose={true}
              footer={[]}
            >
              <SignUp closeModal={closeVisibleSignUpForm} />
            </Modal>
          </Content>
        </Layout>
      </React.Fragment>
    </PollContext.Provider>
  );
};

export default App;
