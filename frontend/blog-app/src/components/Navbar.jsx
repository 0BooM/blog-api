import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <nav className=" bg-[#1B263B] border-b-2 border-[#E0E1DD] text-[#E0E1DD]">
      <div className="container mx-auto flex justify-between pt-5 pb-5 px-4 items-center">
        <Link
          to="/"
          className="relative group text-3xl text-[#E0E1DD] hover:text-white transition-colors"
        >
          Blog.it
          <span
            className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300
            ${
              location.pathname === "/" ? "w-full bg-[#778DA9]" : "w-0 bg-white"
            }
            group-hover:w-full`}
          ></span>
        </Link>
        <ul className="flex flex-row gap-10 text-xl">
          <li key={"home"} className="relative group">
            <Link to="/" className="hover:text-white transition-colors">
              Home
              <span
                className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300
                ${
                  location.pathname === "/"
                    ? "w-full bg-[#778DA9]"
                    : "w-0 bg-white"
                }
                group-hover:w-full`}
              ></span>
            </Link>
          </li>
          {!isLoggedIn && (
            <li key={"sign-up"} className="relative group">
              <Link
                to="/sign-up"
                className="hover:text-white transition-colors"
              >
                Sign up
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300
                ${
                  location.pathname === "/sign-up"
                    ? "w-full bg-[#778DA9]"
                    : "w-0 bg-white"
                }
                group-hover:w-full`}
                ></span>
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <li key="logout" className="relative group">
              <button
                className="hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                Logout
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </button>
            </li>
          ) : (
            <li key={"log-in"} className="relative group">
              <Link to="/login" className="hover:text-white transition-colors">
                Login
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300
                ${
                  location.pathname === "/login"
                    ? "w-full bg-[#778DA9]"
                    : "w-0 bg-white"
                }
                group-hover:w-full`}
                ></span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
