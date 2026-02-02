import "./loginform.css";

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  setToken,
  API_URL,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Enter your email and password");
    } else {
      setSubmitLoading(true);
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: email,
          password: password,
        });
        if (response.data.token) {
          Cookies.set("userToken", response.data.token, { expires: 30 });
          Cookies.set("userUsername", response.data.account.username, {
            expires: 30,
          });
          setToken(response.data.token);
          setSubmitLoading(false);
          if (location.state) {
            navigate(location.state.from);
          } else {
            navigate("/");
          }
        } else {
          alert("Server doesn't respond...");
          setSubmitLoading(false);
        }
      } catch (error) {
        console.log("LOGIN ERR :", error);
        setSubmitLoading(false);
        error.response
          ? alert(error.response.data.message)
          : alert("Check email and password");
      }
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
          required={true}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChangePassword}
          required={true}
        />
        {submitLoading ? (
          <div className="login-submit-disabled">
            <p>Login</p>
          </div>
        ) : (
          <button className="login-submit-button">Login</button>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
