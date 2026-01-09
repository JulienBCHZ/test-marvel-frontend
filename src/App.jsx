import "./App.css";

import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Home from "../pages/Home/Home";
import Characters from "../pages/Characters/Characters";
import Comics from "../pages/Comics/Comics";
import CharacterPage from "../pages/CharacterPage/CharacterPage";
import ComicPage from "../pages/ComicPage/ComicPage";
import Favorits from "../pages/Favorits/Favorits";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";

// COMPONENTS
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const API_URL = "http://localhost:3615/api/v1";
// "https://site--marvel-back-end-rebuilt--hgkxb6f276xk.code.run/api/v1";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  return (
    <>
      <Router>
        <Header setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home API_URL={API_URL} />} />
          <Route path="/comics" element={<Comics API_URL={API_URL} />} />
          <Route
            path="/characters"
            element={<Characters API_URL={API_URL} />}
          />
          <Route
            path="/comics/character/:characterId"
            element={<CharacterPage API_URL={API_URL} />}
          />
          <Route
            path="/comics/comic/:comicId"
            element={<ComicPage API_URL={API_URL} />}
          />
          <Route path="/favorits" element={<Favorits API_URL={API_URL} />} />
          <Route
            path="/auth/signup"
            element={
              <Signup token={token} setToken={setToken} API_URL={API_URL} />
            }
          />
          <Route
            path="/auth/login"
            element={<Login setToken={setToken} API_URL={API_URL} />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
