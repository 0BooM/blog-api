import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <li key={post.id} className="border border-white">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <h5>{post.posted_at}</h5>
      <div>
        <h4>{post.author.username}</h4>
        <Link to={`/posts/${post.id}`}>Read more</Link>
      </div>
    </li>
  );
}
