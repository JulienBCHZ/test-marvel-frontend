import "./allcharacters.css";
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
const AllCharacters = ({ search, setSearch }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [favButton, setFavButton] = useState("");
  const getUserToken = Cookies.get("userToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--project-marvel-backend--hgkxb6f276xk.code.run/characters?page=${page}&name=${search}`
        );
        if (response.data) {
          // console.log("CHAR DATA : ", response.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setErrorMessage("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("CHARACTS ERROR : ", error);
        if (error.response) {
          setErrorMessage(
            `Something went wrong : ${error.response.data.message}`
          );
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
  ) : errorMessage ? (
    <div>
      <p>{errorMessage}</p>
      <TfiFaceSad style="font-size: 4wv; color: grey" />
    </div>
  ) : (
    <>
      <section className="characters-search-section">
        <div className="characters-search-bar">
          <HiOutlineSearch />
          <input
            type="text"
            placeholder="Rechercher des personnages"
            name="search"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </section>
      <section className="all-characters-vision">
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
        <section className="all-characters-container">
          {data.results.map((characters) => {
            const picture = getImage(characters.thumbnail);

            const handleClick = async () => {
              try {
                const response = await axios.post(
                  `https://site--project-marvel-backend--hgkxb6f276xk.code.run/user/favorits/add`,
                  {
                    title: characters.name,
                    description: characters.description,
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
              <section
                className="character-preview-container"
                key={characters._id}
              >
                <Link
                  to={`/comics/character/${characters._id}`}
                  state={{
                    name: characters.name,
                    description: characters.description,
                    image: getImage(characters.thumbnail),
                    comics: characters.comics,
                  }}
                >
                  <img src={getImage(characters.thumbnail)} />
                </Link>
                <div className="charac-details-container">
                  <div className="characters-details">
                    <h2>{characters.name}</h2>
                  </div>
                  <div className="preview-favorit-container">
                    <button
                      className="char-favorit-button"
                      onClick={handleClick}
                    >
                      Add to favorits
                    </button>
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

export default AllCharacters;
