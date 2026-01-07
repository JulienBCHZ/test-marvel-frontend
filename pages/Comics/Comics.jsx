import "./comics.css";

import AllComics from "../../components/AllComics/AllComics";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

const Comics = ({ API_URL }) => {
  const [search, setSearch] = useState("");
  return (
    <main className="main-comics-page">
      <AllComics search={search} setSearch={setSearch} API_URL={API_URL} />
    </main>
  );
};

export default Comics;
