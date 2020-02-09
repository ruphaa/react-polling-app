import React from "react";
import "./style.css";

const App = ({ poll }) => {
  let total = poll.choices.reduce((acc, choice) => acc + choice.count, 0);
  return (
    <div className="stat-levels">
      {poll.choices.map(choice => (
        <div className="stat-1 stat-bar">
          {/* <span>{choice.value}</span> */}
          <span
            className="stat-bar-rating"
            role="stat-bar"
            style={{ width: (choice.count * 100) / total + "%" }}
          >
            {choice.count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default App;
