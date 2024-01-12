import iconReply from "../../images/icon-reply.svg";
import "./replyButton.css";

const ReplyButton = () => {
  return (
    <button className="btn reply-btn flex">
      <img src={iconReply} alt="reply icon" />
      <span>Reply</span>
    </button>
  );
};

export default ReplyButton;
