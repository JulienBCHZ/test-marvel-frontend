import "./loginform.css";

import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";

//    email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             errorMessage={errorMessage}
//             setErrorMessage={setErrorMessage}
//             setToken={setToken}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  errorMessage,
  setErrorMessage,
  setToken,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--project-marvel-backend--hgkxb6f276xk.code.run/auth/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        Cookies.set("userToken", response.data.token, { expires: 10 });
        Cookies.set("userUsername", response.data.account.username, {
          expires: 10,
        });
        setToken(response.data.token);
        setErrorMessage("");
        // navigate("/");
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      } else {
        alert("Check email and/or password");
      }
      //   console.log(response.data);
    } catch (error) {
      error.message ? alert(error.message) : console.log(error);
    }
  };

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form-vision">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChangePassword}
        />
        {/* {errorMessage && <p className="login-error-message">{errorMessage}</p>} */}
        <button className="submit-button">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
