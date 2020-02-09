import React, { useState, useEffect, useContext } from "react";
import Poll from "../Poll";
import { RootContext } from "../RootContext.js";

const App = () => {
  const { authenticated, setAuthenticated } = useContext(RootContext);

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
        <button onClick={() => setAuthenticated(true)}>Login</button>
      )}

      <ul className="poll-list">
        {polls.map(poll => (
          <Poll poll={poll} incrementPollCount={incrementPollCount} />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default App;
