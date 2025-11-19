import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";

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

  const isLoggedIn = !!localStorage.getItem("token");
  const [commentText, setCommentText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText && isLoggedIn) {
      const response = await fetch(`${API_URL}/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: commentText }),
      });

      if (response.ok) {
        setCommentText("");
        loadComments(); // Refresh comments
        setShowComments(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1500); // Hide after 1.5s
      }
    }
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
              <Comment key={comment.id} comment={comment} />
            ))}
        </ul>
      )}

      {isLoggedIn && (
        <>
          {" "}
          {showSuccess && (
            <div className="transition-opacity duration-500 opacity-100 bg-green-200 text-green-900 px-4 py-2 rounded mb-2">
              Comment posted!
            </div>
          )}
          <form className="mt-4" onSubmit={handleCommentSubmit}>
            <textarea
              name="content"
              id="content"
              placeholder="Write your comment..."
              className="border-2 rounded-sm px-3 py-1 w-full bg-[#1B263B] text-lg"
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <input
              type="submit"
              value="Post comment"
              className="border-2 rounded-sm px-3 py-2 cursor-pointer bg-[#1B263B] hover:bg-[#415A77] transition-all text-lg"
            />
          </form>
        </>
      )}
    </main>
  );
}
