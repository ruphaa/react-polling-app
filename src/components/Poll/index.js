import React, {
  useState,
  useContext,
  forwardRef,
  useRef,
  useImperativeHandle
} from "react";
import PollDetails from "../PollDetails";
import ProgressBar from "../ProgressBar";
import { RootContext } from "../RootContext.js";
import { Modal, Button } from "antd";
import "./style.css";
import PollForm from "../PollForm";

const App = ({ poll, incrementPollCount, deletePoll, editPoll, closePoll }) => {
  const { authenticated, setAuthenticated } = useContext(RootContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const childRef = useRef();

  const showEditModal = () => setVisibleEdit(true);
  const closeEditModal = () => setVisibleEdit(false);

  const showModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      setVisible(false);
    }, 3000);
  };

  const editPollQA = function() {
    let updatedPoll = childRef.current.editPoll();
    // editPoll(id, updatedPoll);
  };

  const closeSelectedPoll = function() {
    closePoll(poll.id, { ...poll, closed: true });
  };

  const openSelectedPoll = function() {
    closePoll(poll.id, { ...poll, closed: false });
  };

  return (
    <li className="poll" key={poll.id}>
      <h3>{poll.title}</h3>
      <div className="btn-action">
        {authenticated ? (
          <React.Fragment>
            <button className="btn-primary" onClick={showEditModal}>
              Edit
            </button>
            <button className="btn-primary" onClick={() => deletePoll(poll.id)}>
              Delete
            </button>
            {poll.closed ? (
              <button className="btn-primary" onClick={openSelectedPoll}>
                Open Poll
              </button>
            ) : (
              <button className="btn-primary" onClick={closeSelectedPoll}>
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
        onOk={handleOk}
        onCancel={closeModal}
        destroyOnClose={true}
        footer={[]}
      >
        {poll.closed ? (
          <ProgressBar poll={poll} />
        ) : (
          <PollDetails poll={poll} incrementPollCount={incrementPollCount} />
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
          </Button>,
          <Button key="submit" type="primary" onClick={editPollQA}>
            Save
          </Button>
        ]}
      >
        <PollForm ref={childRef} poll={poll} />
      </Modal>
    </li>
  );
};

export default App;
