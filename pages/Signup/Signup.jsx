import "./signup.css";

import SignUpForm from "../../components/SignUpForm/SignUpForm";

import { useState } from "react";
import { Link } from "react-router-dom";

// token, setToken

const Signup = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <main className="main-signup">
      <section className="signup-container">
        <div className="title">
          <h1 className="signup-title">S'inscrire</h1>
        </div>
        <div>
          <SignUpForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            newsletter={newsletter}
            setNewsletter={setNewsletter}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            token={token}
            setToken={setToken}
          />
        </div>
        <div className="to-login">
          <Link to="/login">
            <button className="existing-acount">
              Déjà un compte ? Connecte-toi !
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Signup;
