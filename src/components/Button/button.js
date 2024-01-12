import iconMinus from "../../images/icon-minus.svg";
import iconPlus from "../../images/icon-plus.svg";
import "./button.css";

import { useRef } from "react";

// component 3 = votebutton
const VoteButton = ({ personData, index }) => {
  const voteCountRef = useRef(null);
  let { score } = personData;
  const upVote = () => {
    if (voteCountRef) {
      score = +score + 1;
      voteCountRef.current.textContent = score;
    }
  };

  const downVote = () => {
    if (voteCountRef) {
      score = +score - 1;
      voteCountRef.current.textContent = score;
    }
  };
  return (
    <button className="flex btn vote-btn">
      <img className="upvote-icon" onClick={upVote} src={iconPlus} alt="icon" />
      <span ref={voteCountRef} className="vote-value">
        {score}
      </span>
      <img
        className="downvote-icon"
        onClick={downVote}
        src={iconMinus}
        alt="icon"
      />
    </button>
  );
};

export default VoteButton;