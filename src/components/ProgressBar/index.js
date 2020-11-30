import React from "react";
import "./style.css";

const App = ({ poll }) => {
  let total = poll.choices.reduce((acc, choice) => acc + choice.count, 0);
  return (
    <div className="stat-levels">
      {poll.choices.map(choice => (
        <div className="stat-1 stat-bar">
          <div>
            {choice.value} - {choice.count}
          </div>
          <span
            className="stat-bar-rating"
            role="stat-bar"
            style={{ width: (choice.count * 100) / total + "%" }}
          ></span>
        </div>
      ))}
    </div>
  );
};

export default App;
