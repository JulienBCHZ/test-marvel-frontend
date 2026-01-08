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
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

// search={search} setSearch={setSearch}
const AllCharacters = ({ search, setSearch, API_URL }) => {
  const getUserToken = Cookies.get("userToken");

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [favorits, setFavorits] = useState(null);
  const [favoritsLoading, setFavoritsLoading] = useState(true);
  const [favAdded, setFavAdded] = useState(false);
  const [favRemoved, setFavRemoved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/characters?page=${page}&name=${search}`
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
        error.message
          ? setErrorMessage(error.message)
          : setErrorMessage("Something went wrong...");
      }
    };
    fetchData();
  }, [page, search]);

  useEffect(() => {
    const fetchFavoritsData = async () => {
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
    fetchFavoritsData();
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

            const handleAddFavorit = async () => {
              try {
                const response = await axios.post(
                  `${API_URL}/user/favorits/add`,
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
                  <Link
                    className="char-name-link"
                    to={`/comics/character/${characters._id}`}
                    state={{
                      name: characters.name,
                      description: characters.description,
                      image: getImage(characters.thumbnail),
                      comics: characters.comics,
                    }}
                  >
                    <div className="characters-name">
                      <h2>{characters.name}</h2>
                    </div>
                  </Link>
                  <div className="preview-favorit-container">
                    {favoritsLoading ? (
                      <></>
                    ) : (
                      <>
                        {favorits.map((favorit) => {
                          const handleRemoveFavorit = async () => {
                            try {
                              const response = await axios.delete(
                                `${API_URL}/user/favorit/delete/${favorit._id}`,
                                {
                                  headers: {
                                    authorization: `Bearer ${getUserToken}`,
                                  },
                                }
                              );
                              if (response.data.message === "Favorit deleted") {
                                setFavRemoved(true);
                                setFavAdded(false);
                              } else {
                                setFavAdded(true);
                                setFavRemoved(false);
                              }
                            } catch (error) {
                              console.log(error);
                            }
                          };

                          if (favorit.item_title === characters.name) {
                            return (
                              <MdFavorite
                                className="charRemove-favorit-icon"
                                onClick={handleRemoveFavorit}
                                key={favorit._id}
                              />
                            );
                          } else {
                            return (
                              <MdFavoriteBorder
                                className="charAdd-favorit-icon"
                                onClick={handleAddFavorit}
                              />
                            );
                          }
                        })}
                      </>
                    )}

                    {/* {favName === characters.name ? (
                      <MdFavorite className="charRemove-favorit-icon" />
                    ) : (
                      <MdFavoriteBorder
                        className="charAdd-favorit-icon"
                        onClick={handleAddFavorit}
                      />
                    )} */}
                    {/* <MdFavoriteBorder
                      className="charAdd-favorit-icon"
                      onClick={handleAddFavorit}
                    /> */}
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
