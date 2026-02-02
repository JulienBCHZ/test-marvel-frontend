import "./signup.css";

import SignUpForm from "../../components/Auth/SignUpForm/SignUpForm";

import { useState } from "react";
import { Link } from "react-router-dom";

// token, setToken

const Signup = ({ setToken, API_URL }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  return (
    <main className="main-signup">
      <section className="signup-container">
        <div className="title">
          <h4 className="signup-title">Signup</h4>
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
            setToken={setToken}
            API_URL={API_URL}
          />
        </div>
        <div className="to-login">
          <Link to="/auth/login">
            <button className="existing-acount">
              Existing account ? Login !
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Signup;
