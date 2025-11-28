import "./main.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--project-marvel-backend--hgkxb6f276xk.code.run/comics?limit=15`
      );
      console.log(response.data.data);
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <section className="loading">
      <p>Please wait...</p>
    </section>
  ) : (
    <section className="comics-preview-section">
      <Link to="/comics" className="read-comics-link">
        <h1>READ NOW</h1>
      </Link>
      <div className="carrousel">
        {data.results.map((comics) => {
          return (
            <img
              src={getImage(comics.thumbnail)}
              alt="comics"
              className="comics-image"
              key={comics._id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Main;
