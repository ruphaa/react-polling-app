import React, { useState, useContext } from "react";
import PollDetails from "../PollDetails";
import { RootContext } from "../RootContext.js";
import { Modal, Button } from "antd";

const App = ({ poll, incrementPollCount, deletePoll }) => {
  const { authenticated, setAuthenticated } = useContext(RootContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      setVisible(false);
    }, 3000);
  };

  return (
    <li className="poll" key={poll.id}>
      <h3>{poll.title}</h3>
      <button onClick={showModal}>Vote</button>
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
      <Modal
        visible={visible}
        contentLabel="Vote the poll"
        onOk={handleOk}
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        <PollDetails poll={poll} incrementPollCount={incrementPollCount} />
      </Modal>
    </li>
  );
};

export default App;
