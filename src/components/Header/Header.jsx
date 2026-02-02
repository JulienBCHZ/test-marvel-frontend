import "./header.css";

import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/MarvelLogo.svg_uw9pi8.png";
import Cookies from "js-cookie";

import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

const Header = ({ setToken }) => {
  const getUserToken = Cookies.get("userToken");
  const getUserUsername = Cookies.get("userUsername");
  const navigate = useNavigate();
  return (
    <header>
      <div>
        <section className="header-container">
          {getUserToken ? (
            <div className="user-logout">
              <button
                className="logout-button"
                onClick={() => {
                  Cookies.remove("userToken");
                  Cookies.remove("userUsername");
                  setToken(null);
                  navigate("/");
                }}
              >
                <AiOutlineLogout /> Logout
              </button>
            </div>
          ) : (
            <div className="user-connexion">
              <button
                onClick={() => {
                  navigate("/auth/signup");
                }}
                className="signup-button"
              >
                <BsPersonCircle /> Signup
              </button>
              <button
                onClick={() => {
                  navigate("/auth/signup");
                }}
                className="hidden-signup-button"
              >
                <BsPersonCircle />
              </button>
              <button
                onClick={() => {
                  navigate("/auth/login");
                }}
                className="login-button"
              >
                <AiOutlineLogin /> Login
              </button>
              <button
                onClick={() => {
                  navigate("/auth/login");
                }}
                className="hidden-login-button"
              >
                <AiOutlineLogin />
              </button>
            </div>
          )}

          <Link to="/">
            <img src={logo} alt="mavel logo" className="logo" />
          </Link>
          {getUserUsername ? (
            <div className="user-onscreen-username">
              <span className="username-onscreen">{getUserUsername}</span>
            </div>
          ) : (
            <div className="not-onscreen-username"></div>
          )}
        </section>
      </div>
      <section className="header-bottom-container">
        <Link to="/characters">
          <button className="header-bottom-nav">Characters</button>
        </Link>
        <Link to="/comics">
          <button className="header-bottom-nav">Comics</button>
        </Link>
        <Link to="/favorits">
          <button className="header-bottom-nav">Favorits</button>
        </Link>
      </section>
    </header>
  );
};

export default Header;
