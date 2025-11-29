import "./allcomics.css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

const AllComics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--project-marvel-backend--hgkxb6f276xk.code.run/comics?page=${page}`
      );
      // console.log(response.data);

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
    <section className="all-comics-vision">
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
      <section className="all-comics-container">
        {data.results.map((comics) => {
          return (
            <section className="comic-container" key={comics._id}>
              <Link to={`/comics/comic/${comics._id}`}>
                <img src={getImage(comics.thumbnail)} />
              </Link>
              <div className="details-container">
                <div className="button-container">
                  <button className="favorit-button">Add to favorits</button>
                </div>
                <div className="comics-details">
                  <h2>{comics.title}</h2>
                  {comics.description === null ? (
                    <p>Description is coming...</p>
                  ) : (
                    <p>{comics.description}</p>
                  )}
                  {/* <p>{comics.description}</p> */}
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

export default AllComics;
