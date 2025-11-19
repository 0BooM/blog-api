export default function Comment({ comment }) {
  return (
    <li className="mb-2">
      <strong>{comment.author?.username}:</strong> {comment.content}
    </li>
  );
}
