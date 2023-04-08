// CommentsView.jsx
import React from "react";
import Comment from "../recipe/Comment.jsx";
import { Divider } from "primereact/divider";

function CommentsView({ comments }) {
  return (
    <>
      <h3 className="mb-4 pb-2">Recent Comments</h3>
      {comments &&
        comments.results.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </>
  );
}

export default CommentsView;
