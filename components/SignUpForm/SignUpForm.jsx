import "./signupform.css";

import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

//  username={username}
//             setUsername={setUsername}
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             newsletter={newsletter}
//             setNewsletter={setNewsletter}
//             errorMessage={errorMessage}
//             setErrorMessage={setErrorMessage}
//             token={token}
//             setToken={setToken}

const SignUpForm = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  newsletter,
  setNewsletter,
  errorMessage,
  setErrorMessage,
  token,
  setToken,
  API_URL,
}) => {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      alert("A username, an email and a password are required");
    } else {
      try {
        const response = await axios.post(`${API_URL}/auth/signup`, {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        });
        if (response.data.token) {
          Cookies.set("userToken", response.data.token, { expires: 30 });
          Cookies.set("userUsername", response.data.account.username, {
            expires: 30,
          });
          setToken(response.data.token);
          navigate("/");
          setErrorMessage("");
        } else {
          alert("Server doesn't respond...");
        }
        //   console.log(response.data);
      } catch (error) {
        error.message
          ? alert("Check all fields", error.message)
          : console.log("SIGNUP ERR :", error);
      }
    }
  };

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
    if (value.length < 4 && value.length > 0) {
      setUsernameError("username is too short");
    } else {
      setUsernameError("");
    }
  };
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length < 6 && value.length > 0) {
      setPasswordError("password is too short");
    } else {
      setPasswordError("");
    }
  };
  const handleCheckNewsletter = (event) => {
    const value = event.target.checked;
    setNewsletter(value);
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit} className="signup-form-vision">
        <div className="input-fields">
          <input
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={handleChangeUsername}
          />
          {usernameError ? (
            <div className="field-error-text">
              <p>{usernameError}</p>
            </div>
          ) : (
            <div className="field-error-text"></div>
          )}
        </div>
        <div className="input-fields">
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
          />
          {emailError ? (
            <div className="field-error-text">
              <p>{emailError}</p>
            </div>
          ) : (
            <div className="field-error-text"></div>
          )}
        </div>
        <div className="input-fields">
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
          {passwordError ? (
            <div className="field-error-text">
              <p>{passwordError}</p>
            </div>
          ) : (
            <div className="field-error-text"></div>
          )}
        </div>

        <section className="form-checkbox">
          <div className="line-checkbox">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={handleCheckNewsletter}
              className="checkbox"
            />
            <span>Subscribe to our newsletter</span>
          </div>
          <div className="newsletter-terms">
            <p>
              By signing up, I confirm that I have read and accepted the Terms &
              Conditions and Privacy Policy. I confirm that I am at least 18
              years old.
            </p>
          </div>
        </section>

        <button className="submit-button">Signup</button>
      </form>
    </div>
  );
};

export default SignUpForm;
