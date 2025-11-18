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
  }, []);

   if (loading) return <main>Loading...</main>;
   if (!post) return <main>Post not found.</main>;

  console.log(post);
  return (
    <main>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h5>{post.posted_at}</h5>
      <div>
        <h4>{post.author?.username}</h4>
      </div>
    </main>
  );
}
