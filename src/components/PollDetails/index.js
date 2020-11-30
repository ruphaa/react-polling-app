import React, { useState, useContext } from "react";
import ProgressBar from "../ProgressBar";
import "./style.css";
import { PollContext } from "../RootContext.js";

const App = ({ poll }) => {
  const { dispatch } = useContext(PollContext);
  const [showProgress, setShowProgress] = useState(false);

  const incrementCounter = event => {
    let id = event.currentTarget.dataset["id"];
    poll["choices"].forEach((item, i) => {
      debugger;
      if (item.id == id) item.count++;
    });
    // poll["choices"][id].count++;
    dispatch({ type: "VOTE_POLL", id: poll.id, updatedPoll: poll });
    setShowProgress(true);
  };

  return (
    <div className="poll-wrapper">
      <h3>{poll.title}</h3>
      {showProgress ? (
        <ProgressBar poll={poll} />
      ) : (
        <ul className="choices">
          {poll.choices.map(choice => (
            <li>
              <span data-id={choice.id} onClick={incrementCounter}>
                {choice.value}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
