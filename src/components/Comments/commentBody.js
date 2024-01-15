import "./commentBody.css";

// component 2 = comments content body
const CommentBody = ({ personData }) => {
  const { content } = personData;
  const { replyingTo } = personData;

  const replyTo = replyingTo ? (
    <span className="user-being-replied">@{replyingTo}&nbsp;</span>
  ) : (
    ""
  );

  return (
    <p className="comment-content">
      {replyTo}
      {content}
    </p>
  );
};

export default CommentBody;
