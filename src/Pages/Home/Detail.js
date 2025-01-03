import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchIdeaDetails, addCommentToIdea } from '../../Features/IdeaDetailsSlice'; // Import actions
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { idea, comments, loading, error } = useSelector((state) => state.ideaDetails);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    dispatch(fetchIdeaDetails(id)); // Fetch idea details when the component mounts
  }, [dispatch, id]);

  const handleAddComment = () => {
    if (commentInput.trim()) {
      dispatch(addCommentToIdea({ ideaId: id, commentText: commentInput }));
      setCommentInput(''); // Clear the input after submitting
    }
  };

  return (
    <div className="detail-page">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      {idea && (
        <>
          <h1 className="idea-name">{idea.idea_name}</h1>
          <p className="idea-description">{idea.description}</p>
          <h4>Presented by:</h4>
          <h5>{idea.userName}</h5>
          <p>{idea.userEmail}</p>

          <hr />

          <div className="comment-section">
            <h2>Comments</h2>
            <ul className="comment-list">
              {comments?.map((comment) => (
                <li key={comment.commentId} className="comment-item">
                  {comment.text}
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
        </>
      )}
    </div>
  );
};

export default Detail;
