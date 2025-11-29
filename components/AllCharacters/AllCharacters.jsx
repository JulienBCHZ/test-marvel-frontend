import "./allcharacters.css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

const AllCharacters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--project-marvel-backend--hgkxb6f276xk.code.run/characters?page=${page}`
      );
      console.log("CHAR :", response.data);

      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return isLoading ? (
    <section className="loading">
      <p>Please wait...</p>
    </section>
  ) : (
    <section className="all-characters-vision">
      <pages className="change-page">
        {page > 1 ? (
          <button
            className="button-enabled"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <GrPrevious />
          </button>
        ) : (
          <button className="button-disabled"></button>
        )}
        <span>{page}</span>
        {page < 10 ? (
          <button
            className="button-enabled"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <GrNext />
          </button>
        ) : (
          <button className="button-disabled"></button>
        )}
      </pages>
      <section className="all-characters-container">
        {data.results.map((characters) => {
          return (
            <section className="character-container" key={characters._id}>
              <Link to={`comics/${characters._id}`}>
                <img src={getImage(characters.thumbnail)} />
              </Link>
              <div className="charac-details-container">
                <div className="characters-details">
                  <h2>{characters.name}</h2>
                  {/* <p>{characters.description}</p> */}
                </div>
                <div className="favorit-container">
                  <button className="char-favorit-button">
                    Add to favorits
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </section>
      <pages className="change-page">
        {page > 1 ? (
          <button
            className="button-enabled"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <GrPrevious />
          </button>
        ) : (
          <button className="button-disabled"></button>
        )}
        <span>{page}</span>
        {page < 10 ? (
          <button
            className="button-enabled"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <GrNext />
          </button>
        ) : (
          <button className="button-disabled"></button>
        )}
      </pages>
    </section>
  );
};

export default AllCharacters;
