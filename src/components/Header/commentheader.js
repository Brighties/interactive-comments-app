import "./commentHeader.css";

// component 1
const CommentHeader = ({ personData }) => {
  const { user, createdAt } = personData;

  return (
    <div className="header flex">
      <img src={user.image.png} alt="person avatar" />
      <h3>{user.username}</h3>
      <p className="time-of-comment">{createdAt}</p>
    </div>
  );
};

export default CommentHeader;
