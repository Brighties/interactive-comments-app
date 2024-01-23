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
import { UpdateButton } from "../Button/button";
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
    setModalData((prevState) => ({
      isOpen: true,
      itemToDelete: item,
    }));
  };

  const handleDeleteConfirm = () => {
    // Step 1: Grab the item to delete
    const itemToDelete = modalData.itemToDelete;

    // Step 2: Delete the item from data.comments (including replies)
    setData((prevData) => {
      const updatedComments = prevData.comments.map((comment) => {
        if (comment.id === itemToDelete.id) {
          // If the comment matches the item to delete, exclude it
          return null;
        }

        const updatedReplies = comment.replies.filter(
          (reply) => reply.id !== itemToDelete.id
        );

        return {
          ...comment,
          replies: updatedReplies,
        };
      });

      // Remove comments with null (i.e., the ones to be deleted)
      const filteredComments = updatedComments.filter(
        (comment) => comment !== null
      );

      return {
        ...prevData,
        comments: filteredComments,
      };
    });

    // Step 3: Close the modal
    setModalData({
      isOpen: false,
      itemToDelete: null,
    });
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
            setData={setData}
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

const Comments = ({ data, personData, index, onDeleteClick, setData }) => {
  const { currentUser } = data;
  const { user } = personData;
  const { username } = user;

  const [isEditMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleUpdateClick = () => {
    setEditMode(false);
  };

  let isCurrentUser = false;
  if (currentUser.username) {
    isCurrentUser = username === currentUser.username;
  }

  const { replies } = personData;
  const length = replies ? replies.length : 0;

  return (
    <>
      <section className="comment-full-container container flex">
        <div className="comment-header-and-body-container">
          <CommentHeader data={data} personData={personData} index={index} />
          {isEditMode ? (
            <textarea className="reply-textbox" rows={5} />
          ) : (
            <CommentBody personData={personData} index={index} />
          )}
        </div>

        <div className="btn-container">
          <VoteButton personData={personData} index={index} />
          {isCurrentUser ? (
            <div className="edit-and-delete-button-container">
              {isEditMode ? (
                <UpdateButton onClick={handleUpdateClick} />
              ) : (
                <>
                  <DeleteButton onClick={() => onDeleteClick(personData)} />
                  <EditButton onClick={handleEditClick} />
                </>
              )}
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
              setData={setData}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
