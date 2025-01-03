import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ideas } from "./All";
import "./Detail.css";

const Detail = () => {
  const params = useParams();
  // const navigate = useNavigate();
  // const idea=ideas.find((idea) => idea.id ===params.id)[0];
  const idea = ideas.find((idea) => idea.id === Number(params.id));
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  // If idea is not found, display an error or redirect
  // if (!idea) {
  //   return (
  //     <div className="error">
  //       <h2>Idea not found</h2>
  //       <button onClick={() => navigate("/all")}>Go Back</button>
  //     </div>
  //   );
  // }

  return (
    <div className="detail-page">
      <h1 className="idea-name">{idea.name}</h1>
      <p className="idea-description">{idea.description}</p>
      <h4>Presented by:</h4>
      <h5>{idea.Pname}</h5>
      <p>{idea.Pemail}</p>
      <hr />
      <div className="comment-section">
        <h2>Comments</h2>
        <ul className="comment-list">
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              {comment}
            </li>
          ))}
        </ul>
        <textarea
          className="comment-box"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add your comment here..."
        ></textarea>
        <button className="add-comment-btn" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Detail;
