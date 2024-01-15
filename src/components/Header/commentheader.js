import "./commentHeader.css";

// component 1
const CommentHeader = ({ personData, data }) => {
  const { currentUser } = data;
  const { user, createdAt } = personData;
  const { username, image } = user;

  let isCurrentUser = false;
  if (currentUser.username) {
    isCurrentUser = username === currentUser.username;
  }
  return (
    <div className="header flex">
      <img src={image.png} alt="person avatar" />
      <h3>{username}</h3>
      {isCurrentUser && <CurrentUserLabel />}
      <p className="time-of-comment">{createdAt}</p>
    </div>
  );
};

const CurrentUserLabel = () => <span className="current-user-label">you</span>;
export default CommentHeader;
