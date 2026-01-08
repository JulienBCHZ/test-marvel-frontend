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
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

// search={search} setSearch={setSearch}

const AllComics = ({ search, setSearch, API_URL }) => {
  const getUserToken = Cookies.get("userToken");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [favButton, setFavButton] = useState(true);
  const [favorits, setFavorits] = useState(null);
  const [favoritsLoading, setFavoritsLoading] = useState(true);
  const [favAdded, setFavAdded] = useState(false);
  const [favRemoved, setFavRemoved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/comics?page=${page}&title=${search}`
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
        error.message
          ? setErrorMessage(error.message)
          : setErrorMessage("Something went wrong...");
      }
    };
    fetchData();
  }, [page, search]);

  useEffect(() => {
    const fetchFavoritsComicsData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/favorits`, {
          headers: {
            authorization: `Bearer ${getUserToken}`,
          },
        });
        if (response.data) {
          console.log("READ FAV DATA : ", response.data);
          setFavorits(response.data.favorits);
          setFavoritsLoading(false);
        } else {
          setFavoritsLoading(false);
        }
      } catch (error) {
        setFavoritsLoading(false);
        console.log("READ FAV ERROR : ", error);
      }
    };
    fetchFavoritsComicsData();
  }, [favAdded, favRemoved]);

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
            const handleAddFavorit = async () => {
              try {
                const response = await axios.post(
                  `${API_URL}/user/favorits/add`,
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
                if (response.data.message === "Add in favorits") {
                  setFavAdded(true);
                  // setFavName(response.data.data.item_title);
                } else {
                  setFavAdded(false);
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
                  <div className="comics-details">
                    <Link
                      to={`/comics/comic/${comics._id}`}
                      className="comics-title-link"
                    >
                      <h2>{comics.title}</h2>
                    </Link>

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
