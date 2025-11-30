import "./characters.css";

import AllCharacters from "../../components/AllCharacters/AllCharacters";

import { useState, useEffect } from "react";

const Characters = () => {
  const [search, setSearch] = useState("");
  return (
    <main className="main-characters-page">
      <AllCharacters search={search} setSearch={setSearch} />
    </main>
  );
};

export default Characters;
