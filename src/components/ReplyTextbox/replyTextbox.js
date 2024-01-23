import "./replyTextbox.css";

// component 5 reply textbox
const ReplyTextbox = ({ data }) => {
  return (
    <section className="reply-textbox-container container">
      <textarea
        className="reply-textbox"
        rows={5}
        placeholder="Add a comment..."
      ></textarea>
      <img
        className="current-user-image"
        src={data.currentUser.image.png}
        alt="current user "
      />
      <button className="send-btn"> send </button>
    </section>
  );
};

export default ReplyTextbox;
