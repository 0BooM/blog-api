import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]); // Initial state as empty array
  const API_URL = import.meta.env.VITE_API_URL; // Correct variable name

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h3>Welcome to the Homepage!</h3>
      <ul>
        {posts.map((post) => (
          <PostCard post={post}/>
        ))}
      </ul>
    </div>
  );
}

export default Home;
