import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <p>I am happy coding</p>
    </>
  );
}

const Header = ({ data, index }) => {
  const user = data.comments[index].user;
  const comments = data.comments[index];
  return (
    <div>
      <div className="comment">
        <img src={user.image.png} alt="person avatar" />
        <h3>{user.username}</h3>
      </div>
      <article>{comments.content}</article>
    </div>
  );
};

export default App;
