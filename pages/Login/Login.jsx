import "./login.css";

import LoginForm from "../../components/LoginForm/LoginForm";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = ({ setToken, API_URL }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="main-login">
      <section className="login-container">
        <div className="title">
          <h4 className="login-title">Login</h4>
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
            API_URL={API_URL}
          />
        </div>
        <div className="to-signup">
          <Link to="/auth/signup">
            <button className="no-acount">No account ? Signup !</button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
