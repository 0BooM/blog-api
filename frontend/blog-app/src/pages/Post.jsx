import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .finally(() => setLoading(false))
      .catch((error) => console.error(error));
  }, [id, API_URL]);

  const [comments, setComments] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const loadComments = () => {
    fetch(`${API_URL}/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .finally(() => setCommentsLoading(false))
      .catch((error) => console.error(error));
  };

  const handleToggleComments = () => {
    if (!showComments && !comments) {
      loadComments();
    }
    setShowComments((prev) => !prev);
  };

  if (loading) return <main>Loading...</main>;
  if (!post) return <main>Post not found.</main>;

  console.log(post);
  return (
    <main>
      <div className="post-content mb-20">
        <h1 className="font-bold">{post.title}</h1>
        <p className="text-2xl">{post.content}</p>
        <h5>{post.posted_at}</h5>
        <div>
          <h4>{post.author?.username}</h4>
        </div>
      </div>
      <button onClick={handleToggleComments} disabled={commentsLoading}>
        {commentsLoading
          ? "Loading..."
          : showComments
          ? "Hide Comments"
          : "Show Comments"}
      </button>
      {showComments && (
        <ul>
          {comments &&
            comments.map((comment) => (
              <li key={comment.id} className="mb-2">
                <strong>{comment.author?.username}:</strong> {comment.content}
              </li>
            ))}
        </ul>
      )}
    </main>
  );
}
