import "./mainhero.css";

import { useState, useEffect } from "react";
import axios from "axios";

import getImage from "../../utils/getImage";

const MainHero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--project-marvel-backend--hgkxb6f276xk.code.run/characters?limit=5`
      );
      console.log("RES :", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <section className="loading">
      <p>Please wait...</p>
    </section>
  ) : (
    <section className="hero">
      {data.results.map((character) => {
        return <img src={getImage(character.thumbnail)} />;
      })}
    </section>
  );
};

export default MainHero;
