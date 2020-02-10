import React, { useState, useEffect, useContext } from "react";
import Poll from "../Poll";
import { RootContext } from "../RootContext.js";
import ReactModal from "react-modal";
import Login from "../Login";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    minHeight: "200px"
  }
};

const App = () => {
  const { authenticated, setAuthenticated } = useContext(RootContext);
  const [modalIsOpen, setIsOpen] = useState(false);

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

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }

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
      <h2>Voting app</h2>
      {authenticated ? (
        <React.Fragment>
          <button onClick={() => setAuthenticated(false)}>Logout</button>
          <button onClick={() => console.log("Add a poll")}>
            Create a Poll
          </button>
        </React.Fragment>
      ) : (
        <button onClick={openModal}>Login</button>
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
      <ReactModal
        contentLabel="Minimal Modal Example"
        style={customStyles}
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
      >
        <Login closeModal={closeModal} />
        <button onClick={closeModal}>Close Modal</button>
      </ReactModal>
    </React.Fragment>
  );
};

export default App;
