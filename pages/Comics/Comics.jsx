import "./comics.css";

import AllComics from "../../components/AllComics/AllComics";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

const Comics = () => {
  const [search, setSearch] = useState("");
  return (
    <main className="main-comics-page">
      <AllComics />
    </main>
  );
};

export default Comics;
