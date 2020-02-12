import React, { useState, useEffect, useContext } from "react";
import Poll from "../Poll";
import { RootContext } from "../RootContext.js";
import { Modal, Button } from "antd";
import Login from "../Login";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  // States
  const { authenticated, setAuthenticated } = useContext(RootContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      setVisible(false);
    }, 3000);
  };

  const poll1 = [
    {
      id: Date.now(),
      title: "Have you been crazy lately?",
      choices: [
        {
          value: "Yes",
          count: 0,
          position: 0
        },
        {
          value: "No",
          count: 0,
          position: 1
        },
        {
          value: "Who cares",
          count: 0,
          position: 2
        }
      ]
    },
    {
      id: Date.now() + 1,
      title: "Do we all need a friends reunion?",
      choices: [
        {
          value: "Yes",
          count: 0,
          position: 0
        },
        {
          value: "No",
          count: 0,
          position: 1
        }
      ]
    }
  ];
  const defaultPoll = JSON.parse(window.localStorage.getItem("polls")) || poll1;

  const [polls, setPolls] = useState(defaultPoll);

  useEffect(() => {
    window.localStorage.setItem("polls", JSON.stringify(polls));
  });

  const incrementPollCount = (id, updatedPoll) => {
    setPolls(polls.map(poll => (poll.id == id ? updatedPoll : poll)));
  };

  const deletePoll = id => {
    setPolls(polls.filter(poll => poll.id !== id));
  };

  return (
    <React.Fragment>
      <Layout>
        <Header>Voting app</Header>
        <Content>
          {authenticated ? (
            <React.Fragment>
              <button onClick={() => setAuthenticated(false)}>Logout</button>
              <button onClick={() => console.log("Add a poll")}>
                Create a Poll
              </button>
            </React.Fragment>
          ) : (
            <button onClick={showModal}>Login</button>
          )}

          <ul className="poll-list">
            {polls.map(poll => (
              <Poll
                poll={poll}
                incrementPollCount={incrementPollCount}
                deletePoll={deletePoll}
              />
            ))}
          </ul>
          <Modal
            visible={visible}
            contentLabel="Login"
            onOk={handleOk}
            onCancel={closeModal}
            footer={[
              <Button key="back" onClick={closeModal}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleOk}
              >
                Return
              </Button>
            ]}
          >
            <Login closeModal={closeModal} />
            <button onClick={closeModal}>Close Modal</button>
          </Modal>
        </Content>
      </Layout>
    </React.Fragment>
  );
};

export default App;
