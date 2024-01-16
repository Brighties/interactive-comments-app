import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

// importing the various components
import CommentHeader from "../Header/commentheader";
import CommentBody from "../Comments/commentBody";
import VoteButton from "../Button/button";
import { ReplyButton } from "../Button/button";
import ReplyTextbox from "../ReplyTextbox/replyTextbox";
import { DeleteButton } from "../Button/button";
import { EditButton } from "../Button/button";

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
      {data.comments.map((comment, index) => (
        <div key={index}>
          <Comments data={data} personData={comment} index={index} />
        </div>
      ))}
      <ReplyTextbox data={data} />
    </>
  );
}

const Comments = ({ data, personData, index }) => {
  const { currentUser } = data;
  const { user } = personData;
  const { username } = user;

  let isCurrentUser = false;
  if (currentUser.username) {
    isCurrentUser = username === currentUser.username;
  }
  console.log(isCurrentUser);
  const { replies } = personData; // replies is an array
  const length = replies ? replies.length : 0; // Check if replies is defined

  return (
    <main>
      <div>
        <section className="comment-full-container container flex">
          <CommentHeader data={data} personData={personData} index={index} />
          <CommentBody personData={personData} index={index} />
          <div className="flex btn-container">
            <VoteButton personData={personData} index={index} />
            {isCurrentUser ? (
              <div>
                <DeleteButton /> <EditButton />
              </div>
            ) : (
              <ReplyButton />
            )}
          </div>
        </section>

        {length > 0 && (
          // Subcomments
          <div className="subcomment-container">
            {replies.map((reply, subIndex) => (
              <Comments
                data={data}
                key={subIndex}
                personData={reply}
                index={subIndex}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
