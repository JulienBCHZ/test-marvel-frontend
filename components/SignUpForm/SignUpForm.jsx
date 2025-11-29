import "./signupform.css";

import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

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
}) => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--project-marvel-backend--hgkxb6f276xk.code.run/auth/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      if (response.data.token) {
        Cookies.set("userToken", response.data.token, { expires: 10 });
        setToken(response.data.token);
        navigate("/");
        setErrorMessage("");
      } else {
        setErrorMessage("Vérifiez les champs");
      }
      //   console.log(response.data);
    } catch (error) {
      error.response
        ? setErrorMessage(error.response.data.message)
        : console.log(error);
    }
  };

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };
  const handleCheckNewsletter = (event) => {
    const value = event.target.checked;
    setNewsletter(value);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-vision">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleChangeUsername}
        />
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
        {errorMessage && <p className="signup-error-message">{errorMessage}</p>}
        <section className="form-checkbox">
          <div className="line-checkbox">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={handleCheckNewsletter}
              className="checkbox"
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <div className="newsletter-terms">
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
        </section>

        <button className="submit-button">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUpForm;
