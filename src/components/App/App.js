import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentHeader from "../Header/commentheader";
import CommentBody from "../Comments/commentBody";
import VoteButton from "../Button/button";
import { ReplyButton } from "../Button/button";
import ReplyTextbox from "../ReplyTextbox/replyTextbox";
import { DeleteButton } from "../Button/button";
import { EditButton } from "../Button/button";
import Modal from "../Modal/modal";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalData, setModalData] = useState({
    isOpen: false,
    itemToDelete: null,
  });

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

  const handleDeleteClick = (item) => {
    console.log("delete", item);
    setModalData({
      isOpen: true,
      itemToDelete: item,
    });
  };

  // const handleDeleteConfirm = () => {
  //   // Find and remove the itemToDelete from the data.comments array
  //   const updatedComments = data.comments.filter((comment) => {
  //     console.log(comment);
  //     console.log(modalData.itemToDelete);

  //     return comment !== modalData.itemToDelete;
  //   });

  //   // Update the data state with the modified comments
  //   setData({
  //     ...data,
  //     comments: updatedComments,
  //   });

  //   // Close the modal
  //   setModalData({
  //     isOpen: false,
  //     itemToDelete: null,
  //   });
  // };
  const handleDeleteConfirm = () => {
    // Find the index of the itemToDelete in the data.comments array
    const indexToDelete = data.comments.findIndex(
      (comment) => comment.id === modalData.itemToDelete.id
    );

    if (indexToDelete !== -1) {
      // Create a new array without the itemToDelete using splice
      const updatedComments = [...data.comments];
      updatedComments.splice(indexToDelete, 1);

      // Update the data state with the modified comments
      setData({
        ...data,
        comments: updatedComments,
      });

      // Close the modal
      setModalData({
        isOpen: false,
        itemToDelete: null,
      });
    }
  };

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
          <Comments
            data={data}
            personData={comment}
            index={index}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      ))}
      <ReplyTextbox data={data} />

      {modalData.isOpen && (
        <Modal
          isOpen={modalData.isOpen}
          itemToDelete={modalData.itemToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setModalData({ isOpen: false, itemToDelete: null })}
        />
      )}
    </>
  );
}

const Comments = ({ data, personData, index, onDeleteClick }) => {
  const { currentUser } = data;
  const { user } = personData;
  const { username } = user;

  let isCurrentUser = false;
  if (currentUser.username) {
    isCurrentUser = username === currentUser.username;
  }

  const { replies } = personData;
  const length = replies ? replies.length : 0;

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
                <DeleteButton
                  onClick={() => {
                    console.log("delete button clicked");
                    onDeleteClick(personData);
                  }}
                />
                <EditButton />
              </div>
            ) : (
              <ReplyButton />
            )}
          </div>
        </section>

        {length > 0 && (
          <div className="subcomment-container">
            {replies.map((reply, subIndex) => (
              <Comments
                data={data}
                key={subIndex}
                personData={reply}
                index={subIndex}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
