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

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  return (
    <>
      <Router>
        <Header setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/characters" element={<Characters />} />
          <Route
            path="/comics/character/:characterId"
            element={<CharacterPage />}
          />
          <Route path="/comics/comic/:comicId" element={<ComicPage />} />
          <Route path="/favorits" element={<Favorits />} />
          <Route
            path="/auth/signup"
            element={<Signup token={token} setToken={setToken} />}
          />
          <Route path="/auth/login" element={<Login setToken={setToken} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
