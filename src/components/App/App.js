import "./App.css";
import React, { useEffect, useState } from "react";
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
    return <p>Loading...</p>; // You can replace this with a loading spinner or component
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Header data={data} index={0} />
      <Comments data={data} index={0} />
      <Reply />
      <Button />
    </>
  );
}

// component 1
const Header = ({ data, index }) => {
  const person = data.comments[index];

  return (
    <div className="header flex">
      <img src={person.user.image.png} alt="person avatar" />
      <h3>{person.user.username}</h3>
      <p>{person.createdAt}</p>
    </div>
  );
};

// component 2 = comments content body
const Comments = ({ data, index }) => {
  const comments = data.comments[index];
  return <p>{comments.content}</p>;
};

// component 3 = button

const Button = () => {
  return (
    <button className="flex btn vote-btn">
      <img src={iconMinus} alt="icon" />
      <span>12</span>
      <img src={iconPlus} alt="icon" />
    </button>
  );
};

// component 4
const Reply = () => {
  // used inline styling for the purpose of introducing variety in my code just for fun
  const style = {
    paddingInlineStart: 1 + "rem",
  };
  return (
    <button className="btn reply-btn">
      <img src={iconReply} />
      <span style={style}>Reply</span>
    </button>
  );
};
export default App;
