import "./header.css";
import { IoMdLogIn } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";

import { useNavigate, Link } from "react-router-dom";
import logo from "../../src/assets/MarvelLogo.svg_uw9pi8.png";
import Cookies from "js-cookie";

const Header = ({ setToken }) => {
  const getUserToken = Cookies.get("userToken");
  const navigate = useNavigate();
  return (
    <header>
      <div>
        <div className="header-container">
          {getUserToken ? (
            <section className="user-logout">
              <button
                className="logout-button"
                onClick={() => {
                  Cookies.remove("userToken");
                  setToken(null);
                  navigate("/");
                }}
              >
                <BsPersonCircle /> Logout
              </button>
            </section>
          ) : (
            <section className="user-connexion">
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
                  navigate("/auth/login");
                }}
                className="login-button"
              >
                <AiOutlineLogin /> Login
              </button>
            </section>
          )}

          <Link to="/">
            <img src={logo} alt="mavel logo" className="logo" />
          </Link>
        </div>
      </div>
      <div>
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
      </div>
    </header>
  );
};

export default Header;
