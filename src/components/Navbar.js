import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <nav className="navbar">
      {/* LEFT SIDE */}
      <div className="nav-left">
        <Link to="/" className="logo">
          Bellcorp Events
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        {token ? (
          <>
            <Link to="/events">Events</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* If Login page → show Sign Up */}
            {isLoginPage && <Link to="/register">Sign Up</Link>}

            {/* If Register page → show Login */}
            {isRegisterPage && <Link to="/login">Login</Link>}

            {/* If Home or any other public page */}
            {!isLoginPage && !isRegisterPage && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
