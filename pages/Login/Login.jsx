import "./login.css";

import LoginForm from "../../components/LoginForm/LoginForm";

import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <main className="main-login">
      <section className="login-container">
        <div className="title">
          <h4 className="login-title">Se connecter</h4>
        </div>
        <div>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setToken={setToken}
          />
        </div>
        <div className="to-signup">
          <Link to="/auth/signup">
            <button className="no-acount">
              Pas encore de compte ? Inscris-toi !
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
