import "./characters.css";

import AllCharacters from "../../components/AllCharacters/AllCharacters";

import { useState } from "react";

const Characters = ({ API_URL }) => {
  const [search, setSearch] = useState("");
  return (
    <main className="main-characters-page">
      <AllCharacters search={search} setSearch={setSearch} API_URL={API_URL} />
    </main>
  );
};

export default Characters;
