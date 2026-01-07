import "./allcomics.css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import getImage from "../../utils/getImage";

import { TfiFaceSad } from "react-icons/tfi";

// search={search} setSearch={setSearch}

const AllComics = ({ search, setSearch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [favButton, setFavButton] = useState("");
  const getUserToken = Cookies.get("userToken");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--project-marvel-backend--hgkxb6f276xk.code.run/comics?page=${page}&title=${search}`
        );
        if (response.data) {
          // console.log("COMICS DATA :", response.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setErrorMessage("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("COMICS ERROR : ", error);
        if (error.message) {
          setErrorMessage(`Something went wrong : ${error.message}`);
        } else {
          setErrorMessage("Something went wrong...");
        }
      }
    };
    fetchData();
  }, [page, search]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  return isLoading ? (
    <section className="loading">
      <p>Please wait...</p>
    </section>
  ) : (
    <>
      <section className="comics-search-section">
        <div className="comics-search-bar">
          <HiOutlineSearch />
          <input
            type="text"
            placeholder="Rechercher des comics"
            name="search"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </section>
      <section className="all-comics-vision">
        <div className="change-page">
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
        </div>

        <section className="all-comics-container">
          {data.results.map((comics) => {
            const picture = getImage(comics.thumbnail);

            // title, description
            const handleClick = async () => {
              try {
                const response = await axios.post(
                  `https://site--project-marvel-backend--hgkxb6f276xk.code.run/user/favorits/add`,
                  {
                    title: comics.title,
                    description: comics.description,
                    image: picture,
                  },
                  {
                    headers: {
                      authorization: `Bearer ${getUserToken}`,
                    },
                  }
                );
                if (response.data.message === "Already added in favorits") {
                  setFavButton(response.data.message);
                } else {
                  setFavButton("");
                }
                console.log("FAV :", response.data);
              } catch (error) {
                console.log(error);
              }
            };

            return (
              <section className="comic-container" key={comics._id}>
                <Link to={`/comics/comic/${comics._id}`}>
                  <img src={getImage(comics.thumbnail)} />
                </Link>
                <div className="details-container">
                  <div className="button-container">
                    <button className="favorit-button" onClick={handleClick}>
                      Add to favorits
                    </button>
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
        <div className="change-page">
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
        </div>
      </section>
    </>
  );
};

export default AllComics;
