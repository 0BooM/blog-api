import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, password, email})
    });
    const data = await response.json();
    console.log(data);
    if(response.ok){
        navigate("/");
    } else {
        setError(data.error || "Signup failed");
    }
  }
  return (
    <div className="sign-up-form">
      <h1>Sign up form</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="border"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="submit" value="Sign up" className="border" />
      </form>
    </div>
  );
}
