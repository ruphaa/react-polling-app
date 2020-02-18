import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useRef,
  useImperativeHandle
} from "react";
import Poll from "../Poll";
import { RootContext } from "../RootContext.js";
import { Modal, Button } from "antd";
import Login from "../Login";
import PollForm from "../PollForm";
import { Layout } from "antd";
import "./style.css";

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  // States
  const { authenticated, setAuthenticated } = useContext(RootContext);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visiblePollForm, setVisiblePollForm] = useState(false);

  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const childRef = useRef();

  const showLoginModal = () => setVisibleLogin(true);
  const closeLoginModal = () => setVisibleLogin(false);

  const showPollFormModal = () => setVisiblePollForm(true);
  const closePollFormModal = () => setVisiblePollForm(false);

  const poll1 = [
    {
      id: Date.now(),
      title: "Have you been crazy lately?",
      closed: false,
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
      closed: false,
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

  const loginUser = function() {
    setAuthenticated(true);
    closeLoginModal();
  };

  const closePoll = function(id, updatedPoll) {
    setPolls(polls.map(poll => (poll.id === id ? updatedPoll : poll)));
  };

  const populatePollOptions = function(e) {
    let newQues = childRef.current.populatePollOptions();
    closePollFormModal();
    setPolls([...polls, newQues]);
  };

  const editPoll = function(id, updatedPoll) {};

  return (
    <React.Fragment>
      <Layout>
        <Header>
          <div className="heading">Voting Polls</div>
          {authenticated ? (
            <div className="heading-menu">
              <button
                className="btn-primary"
                onClick={() => setAuthenticated(false)}
              >
                Logout
              </button>
              <button className="btn-primary" onClick={showPollFormModal}>
                Create a Poll
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={showLoginModal}>
              Login
            </button>
          )}
        </Header>
        <Content>
          <ul className="poll-list">
            {polls.map(poll => (
              <Poll
                poll={poll}
                incrementPollCount={incrementPollCount}
                deletePoll={deletePoll}
                editPoll={editPoll}
                closePoll={closePoll}
              />
            ))}
          </ul>
          {/* Login Modal */}
          <Modal
            visible={visibleLogin}
            contentLabel="Login"
            onCancel={closeLoginModal}
            destroyOnClose={true}
            footer={[
              <Button key="back" onClick={closeLoginModal}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={loginUser}>
                Submit
              </Button>
            ]}
          >
            <Login />
          </Modal>
          {/* Create a Poll */}
          <Modal
            visible={visiblePollForm}
            contentLabel="Create a Poll"
            onCancel={closePollFormModal}
            destroyOnClose={true}
            footer={[
              <Button key="back" onClick={closePollFormModal}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={populatePollOptions}>
                Create
              </Button>
            ]}
          >
            <PollForm ref={childRef} />
          </Modal>
        </Content>
      </Layout>
    </React.Fragment>
  );
};

export default App;
