import React, { useState, useContext } from "react";
import PollDetails from "../PollDetails";
import ReactModal from "react-modal";
import { RootContext } from "../RootContext.js";

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
const App = ({ poll, incrementPollCount, deletePoll }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const { authenticated, setAuthenticated } = useContext(RootContext);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {}
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <li className="poll" key={poll.id}>
      <h3>{poll.title}</h3>
      <button onClick={openModal}>Vote</button>
      {authenticated ? (
        <div className="btn-action">
          <button onClick={() => console.log("Edit")}>Edit</button>
          <button onClick={() => deletePoll(poll.id)}>Delete</button>
          <button onClick={() => console.log("Close the poll")}>
            Close Poll
          </button>
        </div>
      ) : (
        ""
      )}

      <ReactModal
        contentLabel="Minimal Modal Example"
        style={customStyles}
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
      >
        <PollDetails poll={poll} incrementPollCount={incrementPollCount} />
        <button onClick={closeModal}>Close Modal</button>
      </ReactModal>
    </li>
  );
};

export default App;
