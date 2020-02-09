import React, { useState, useContext } from "react";
import ProgressBar from "../ProgressBar";

const App = ({ poll, incrementPollCount }) => {
  const [showProgress, setShowProgress] = useState(false);

  const incrementCounter = event => {
    let position = event.currentTarget.dataset["id"];
    poll["choices"][position].count++;
    incrementPollCount(poll.id, poll);
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
              <span data-id={choice.position} onClick={incrementCounter}>
                {choice.value}
              </span>
              <span>Count - {choice.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
