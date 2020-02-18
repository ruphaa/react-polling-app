import React, {
  useState,
  useEffect,
  useContextforwardRef,
  forwardRef,
  useRef,
  useImperativeHandle
} from "react";
import { RootContext } from "../RootContext";
// import "./style.css";

// Component in progress
// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const App = forwardRef(({ poll }, ref) => {
  const [updatedPoll, setUpdatedPoll] = useState(poll);

  let opts = updatedPoll ? updatedPoll.choices : [];
  let pos = updatedPoll ? updatedPoll.choices.length : 0;
  const [options, setOptions] = useState(opts);
  const [position, setPosition] = useState(pos);

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    populatePollOptions() {
      console.log("populate");
      let choices = [...document.querySelectorAll(".option")].map(el => {
        let pos = el.dataset["key"];
        let val = el.querySelector("input").value;
        return {
          value: val,
          count: 0,
          position: pos
        };
      });
      let title = document.querySelector(".question").value;
      return {
        id: Date.now(),
        title: title,
        choices: choices
      };
    },
    editPoll() {}
  }));

  const removeOption = function(e) {
    let pos = e.currentTarget.nextSibling.dataset["key"];
    let choices = updatedPoll.choices.filter(choice => choice.position != pos);
    setUpdatedPoll({ ...updatedPoll, choices });
    setOptions([...choices]);
    // e.currentTarget.remove();
  };
  const createOptions = function(e) {
    setPosition(position + 1);
    setOptions([
      ...options,
      {
        value: "",
        count: 0,
        position: position
      }
    ]);
  };
  return (
    <div className="form-wrapper">
      <h2>{updatedPoll ? "Edit" : "Create"} a Poll</h2>
      <div className="form">
        <div className="field">
          <label>Ask a Question</label>
          <input
            type="text"
            className="question"
            defaultValue={updatedPoll ? poll.title : ""}
          />
        </div>
        <div className="options">
          {options.map(item => (
            <React.Fragment>
              <button className="remove" onClick={removeOption}>
                Remove
              </button>
              <div className="option" data-key={item.position}>
                <label>Choice {Number(item.position) + 1}</label>
                <input
                  type="text"
                  // value={item.value || ""}
                  defaultValue={item.value || ""}
                />
              </div>
            </React.Fragment>
          ))}
          <button onClick={createOptions}>Add Option</button>
        </div>
      </div>
    </div>
  );
});

export default App;
