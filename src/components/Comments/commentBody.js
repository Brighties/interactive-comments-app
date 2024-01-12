import "./commentBody.css";

// component 2 = comments content body
const CommentBody = ({ personData }) => {
  const { content } = personData;
  return <p className="comment-content">{content}</p>;
};

export default CommentBody;
