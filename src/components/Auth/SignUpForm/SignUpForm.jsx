import "./signupform.css";

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ImEye, ImEyeBlocked } from "react-icons/im";

const SignUpForm = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  newsletter,
  setNewsletter,
  setToken,
  API_URL,
}) => {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      alert("A username, an email and a password are required");
    } else if (usernameError) {
      alert(usernameError);
    } else if (emailError) {
      alert(emailError);
    } else if (passwordError) {
      alert(passwordError);
    } else {
      setSubmitLoading(true);
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
          setSubmitLoading(false);
          navigate("/");
        } else {
          alert("Server doesn't respond...");
          setSubmitLoading(false);
        }
        //   console.log(response.data);
      } catch (error) {
        setSubmitLoading(false);
        console.log("SIGNUP ERR :", error);
        error.response
          ? alert(error.response.data.message)
          : alert("Something went wrong...");
      }
    }
  };

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
    if (value.length > 0 && value.length < 4) {
      setUsernameError("Username is too short");
    } else {
      setUsernameError("");
    }
  };

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (value.length > 0 && value.length < 6) {
      setEmailError("Invalid email format");
    } else if (value.length > 0) {
      // value must contain one & only one "@"
      let counter = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === "@") {
          counter = counter + 1;
        }
      }
      if (counter === 1) {
        setEmailError("");
      } else {
        setEmailError("Invalid email format");
      }
    } else {
      setEmailError("");
    }
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length < 6 && value.length > 0) {
      setPasswordError("Password is too short");
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
            className={usernameError && "input-error"}
            required={true}
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
            className={emailError && "input-error"}
            required={true}
          />
          {emailError ? (
            <div className="field-error-text">
              <p>{emailError}</p>
            </div>
          ) : (
            <div className="field-error-text"></div>
          )}
        </div>
        <div className="input-field-password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            className={passwordError && "input-error"}
            required={true}
          />
          {passwordError ? (
            <div className="field-error-text">
              <p>{passwordError}</p>
            </div>
          ) : (
            <div className="field-error-text"></div>
          )}
          <span
            className="password-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ImEyeBlocked /> : <ImEye />}
          </span>
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
        {submitLoading ? (
          <div className="signup-submit-disabled">
            <p>Signup</p>
          </div>
        ) : (
          <button className="signup-submit-button">Signup</button>
        )}
        {/* <button className="signup-submit-button">Signup</button> */}
      </form>
    </div>
  );
};

export default SignUpForm;
