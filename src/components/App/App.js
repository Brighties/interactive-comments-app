import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import iconMinus from "../../images/icon-minus.svg";
import iconPlus from "../../images/icon-plus.svg";
import iconReply from "../../images/icon-reply.svg";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("./data.json");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; //show loading ...
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Comments data={data} />
    </>
  );
}

// full component
const Comments = ({ data }) => {
  return (
    <section className="full-container flex">
      <CommentHeader data={data} index={0} />
      <CommentBody data={data} index={0} />

      <div className="flex btn-container">
        <VoteButton />
        <ReplyButton />
      </div>
    </section>
  );
};

// component 1
const CommentHeader = ({ data, index }) => {
  const person = data.comments[index];

  return (
    <div className="header flex">
      <img src={person.user.image.png} alt="person avatar" />
      <h3>{person.user.username}</h3>
      <p className="time-of-comment">{person.createdAt}</p>
    </div>
  );
};

// component 2 = comments content body
const CommentBody = ({ data, index }) => {
  const comments = data.comments[index];
  return <p className="comment-content">{comments.content}</p>;
};

// component 3 = button
const VoteButton = () => {
  const voteCountRef = useRef(null);
  const upVote = () => {
    if (voteCountRef) {
      let count = +voteCountRef.current.textContent;
      count += 1;
      voteCountRef.current.textContent = count;
    }
  };

  const downVote = () => {
    if (voteCountRef) {
      let count = +voteCountRef.current.textContent; //typecasting the count to Number type using the + sign
      count = count - 1;
      voteCountRef.current.textContent = count;
    }
  };
  return (
    <button className="flex btn vote-btn">
      <img className="upvote-icon" onClick={upVote} src={iconPlus} alt="icon" />
      <span ref={voteCountRef} className="vote-value">
        12
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

// component 4
const ReplyButton = () => {
  return (
    <button className="btn reply-btn flex">
      <img src={iconReply} alt="reply icon" />
      <span>Reply</span>
    </button>
  );
};
export default App;
