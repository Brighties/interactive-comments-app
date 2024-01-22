import iconMinus from "../../images/icon-minus.svg";
import iconPlus from "../../images/icon-plus.svg";
import iconReply from "../../images/icon-reply.svg";
import deleteIcon from "../../images/icon-delete.svg";
import editIcon from "../../images/icon-edit.svg";
import "./button.css";

import { useState, useRef, useEffect } from "react";

// component 3 = votebutton
const VoteButton = ({ personData, index }) => {
  let { score } = personData;
  const [voteCount, setVoteCount] = useState(score);
  const incrementVoteCountRef = useRef(null);
  const decrementVoteCountRef = useRef(null);

  const handleDownVote = () => {
    setVoteCount((currentValue) => currentValue - 1);
  };
  const handleUpVote = () => {
    setVoteCount((currentValue) => currentValue + 1);
  };

  // useEffect hook to clean the component if it unmounts
  useEffect(() => {
    //capture the value of incrementVoteCountRef.current within the effect to avoid potential issues due to changes in the ref during the component's lifecycle.
    const incrementRef = incrementVoteCountRef.current;
    const decrementRef = decrementVoteCountRef.current;
    return () => {
      incrementRef.removeEventListener("click", handleUpVote);
      decrementRef.removeEventListener("click", handleDownVote);
    };
  }, []);
  return (
    <button className="flex btn vote-btn">
      <img
        ref={incrementVoteCountRef}
        className="upvote-icon"
        onClick={handleUpVote}
        src={iconPlus}
        alt="icon"
      />
      <span className="vote-value">{voteCount}</span>
      <img
        ref={decrementVoteCountRef}
        className="downvote-icon"
        onClick={handleDownVote}
        src={iconMinus}
        alt="icon"
      />
    </button>
  );
};

// delete button component
export const DeleteButton = ({ onClick }) => (
  <button onClick={onClick} className="btn delete-btn">
    <img src={deleteIcon} alt="" />
    <span className="padding-x-small">Delete</span>
  </button>
);

// edit button component
export const EditButton = ({ onClick }) => (
  <button onClick={onClick} className="btn edit-btn">
    <img src={editIcon} alt="" className="edit-button-icon" />
    <span className="padding-x-small edit-button-textcontent">edit</span>
  </button>
);

export const ReplyButton = () => {
  return (
    <button className="btn reply-btn flex">
      <img src={iconReply} alt="reply icon" />
      <span className="reply-button-text">Reply</span>
    </button>
  );
};

export const UpdateButton = ({ onClick }) => {
  return (
    <button className="update-btn" onClick={onClick}>
      Update
    </button>
  );
};

export default VoteButton;
