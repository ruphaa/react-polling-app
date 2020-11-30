import React, { useState, useContext } from "react";
import PollDetails from "../PollDetails";
import ProgressBar from "../ProgressBar";
import { RootContext, PollContext } from "../RootContext.js";
import { Modal, Button } from "antd";
import "./style.css";
import Form from "../Form";

const App = ({ poll }) => {
  const { dispatch } = useContext(PollContext);
  const { authenticated } = useContext(RootContext);

  // Local State
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  // Modal Functionalities
  const showEditModal = () => setVisibleEdit(true);
  const closeEditModal = () => setVisibleEdit(false);

  const showModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return (
    <li className="poll" key={poll.id}>
      <h3>{poll.title}</h3>
      <div className="btn-action">
        {authenticated ? (
          <React.Fragment>
            <button className="btn-primary" onClick={showEditModal}>
              Edit
            </button>
            <button
              className="btn-primary"
              onClick={() => dispatch({ type: "DELETE_POLL", id: poll.id })}
            >
              Delete
            </button>
            {poll.closed ? (
              <button
                className="btn-primary"
                onClick={() =>
                  dispatch({
                    type: "CLOSE_POLL",
                    id: poll.id,
                    updatedPoll: { ...poll, closed: false }
                  })
                }
              >
                Open Poll
              </button>
            ) : (
              <button
                className="btn-primary"
                onClick={() =>
                  dispatch({
                    type: "CLOSE_POLL",
                    id: poll.id,
                    updatedPoll: { ...poll, closed: true }
                  })
                }
              >
                Close Poll
              </button>
            )}
          </React.Fragment>
        ) : (
          ""
        )}
        <button className="btn-primary" onClick={showModal}>
          Vote
        </button>
      </div>

      <Modal
        visible={visible}
        contentLabel="Vote the poll"
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        {poll.closed ? (
          <ProgressBar poll={poll} />
        ) : (
          <PollDetails poll={poll} />
        )}
      </Modal>
      {/* Edit a poll */}
      <Modal
        visible={visibleEdit}
        contentLabel="Edit the Poll"
        onCancel={closeEditModal}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={closeEditModal}>
            Cancel
          </Button>
        ]}
      >
        <Form selectedPoll={poll} closeModal={closeEditModal} isEdit={true} />
      </Modal>
    </li>
  );
};

export default App;
