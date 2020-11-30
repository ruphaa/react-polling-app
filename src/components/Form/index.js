import React, { useState, useContext } from "react";
import { Button } from "antd";
import { PollContext } from "../RootContext";

const App = ({ selectedPoll, isEdit, closeModal }) => {
  let defaultPoll = selectedPoll || {};
  const [poll, setPoll] = useState(defaultPoll);
  const { polls, dispatch } = useContext(PollContext);

  const removeChoice = choiceId => {
    const newPoll = {
      ...poll,
      choices: poll.choices.filter(c => c.id !== choiceId)
    };
    setPoll(newPoll);
  };

  const savePoll = function() {
    let title = document.querySelector(".question").value;
    if (isEdit) {
      dispatch({
        type: "EDIT_POLL",
        id: poll.id,
        updatedPoll: {
          id: poll.id,
          title: title,
          choices: poll.choices
        }
      });
    } else {
      dispatch({
        type: "CREATE_POLL",
        newPoll: {
          id: Date.now(),
          title: title,
          choices: poll.choices
        }
      });
    }

    closeModal();
  };

  const addChoice = () => {
    let newPolls = {};
    if (poll.choices) {
      newPolls = {
        ...poll,
        choices: poll.choices.concat({
          id: Date.now(),
          value: "",
          count: 0
        })
      };
    } else {
      newPolls = {
        ...poll,
        choices: [
          {
            id: Date.now(),
            value: "",
            count: 0
          }
        ]
      };
    }

    setPoll(newPolls);
  };

  const onChoiceChange = (e, choiceId) => {
    const newPoll = {
      ...poll,
      choices: poll.choices.map(c => {
        if (c.id === choiceId) {
          c.value = e.target.value;
        }
        return c;
      })
    };

    setPoll(newPoll);
  };

  const currentTitle = isEdit ? poll.title : "";
  return (
    <div className="form-wrapper">
      <h2>{isEdit ? "Edit" : "Create"} a Poll</h2>
      <div className="form">
        <div className="field">
          <label>Ask a Question</label>
          <input type="text" className="question" defaultValue={currentTitle} />
        </div>
        <div className="options">
          {poll.choices &&
            poll.choices.map((item, n) => (
              <React.Fragment>
                <div className="option" data-key={item.key}>
                  <label>Choice {n + 1}</label>
                  <input
                    type="text"
                    onChange={e => onChoiceChange(e, item.id)}
                    value={item.value || ""}
                  />
                  <button
                    className="remove"
                    onClick={() => removeChoice(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </React.Fragment>
            ))}
          <button onClick={addChoice}>Add Choice</button>
        </div>
      </div>
      <Button key="back" onClick={closeModal}>
        Cancel
      </Button>
      <Button key="submit" type="primary" onClick={savePoll}>
        {isEdit ? "Save" : "Create"}
      </Button>
    </div>
  );
};

export default App;
