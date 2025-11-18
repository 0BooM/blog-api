import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h3 className="">This is navbar in progress</h3>
      <ul>
        <li key={"home"}>
          <Link to="/">Home</Link>
        </li>
        <li key={"sign-up"}>
          <Link to="/sign-up">Sign up</Link>
        </li>
        <li key={"log-in"}>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
