import "./mainhero.css";

import { useState, useEffect } from "react";
import axios from "axios";

const MainHero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--project-marvel-backend--hgkxb6f276xk.code.run/comics`
      );
      console.log("RES :", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return <section className="hero"></section>;
};

export default MainHero;
