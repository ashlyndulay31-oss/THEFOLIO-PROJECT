import React, { useEffect, useState } from "react";
import api from "./api/axios";

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.get("/comments")
      .then(res => setComments(res.data))
      .catch(err => console.error("Axios error:", err));
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map(c => (
          <li key={c._id}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
