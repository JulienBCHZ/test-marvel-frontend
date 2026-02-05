import "./allcharacters.css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import getImage from "../../utils/getImage";

import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

const AllCharacters = ({ search, setSearch, API_URL }) => {
  const getUserToken = Cookies.get("userToken") || null;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [favorits, setFavorits] = useState(null);
  const [favAdded, setFavAdded] = useState(false);
  const [favRemoved, setFavRemoved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/characters?page=${page}&name=${search}`,
        );
        if (response.data) {
          // console.log("CHAR DATA : ", response.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("CHARACTS ERROR : ", error);
        error.response
          ? alert(error.response.data.message)
          : alert("Something went wrong...");
      }
    };
    fetchData();
  }, [page, search]);

  useEffect(() => {
    const fetchFavoritsCharacData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/favorits`, {
          headers: {
            authorization: `Bearer ${getUserToken}`,
          },
        });
        if (response.data) {
          // console.log("READ FAV DATA : ", response.data);
          if (response.data.favorits.length > 0) {
            setFavorits(response.data.favorits);
          } else {
            setFavorits(null);
          }
          // setFavorits(response.data.favorits);
        } else {
          setFavorits(null);
        }
      } catch (error) {
        console.log("READ FAV ERROR : ", error);
      }
    };
    getUserToken && fetchFavoritsCharacData();
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
            placeholder="Search characters..."
            name="search"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </section>

      <section className="all-characters-vision">
        {data.results.length >= 12 ? (
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
            <div className="page-number-container">
              <span>{page}</span>
            </div>

            {page < 20 ? (
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
        ) : (
          <div className="no-change-page-characters"></div>
        )}

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
                  },
                );
                if (response.data.message === "Add in favorits") {
                  setFavAdded(true);
                  // setFavName(response.data.data.item_title);
                } else {
                  setFavAdded(false);
                }
                // console.log("FAV :", response.data);
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
                    {favorits ? (
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
                                },
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
                                key={favorit._id}
                              />
                            );
                          }
                        })}
                      </>
                    ) : (
                      <MdFavoriteBorder
                        className="charAdd-favorit-icon"
                        onClick={handleAddFavorit}
                      />
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </section>
        {data.results.length >= 12 ? (
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
            <div className="page-number-container">
              <span>{page}</span>
            </div>
            {page < 20 ? (
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
        ) : (
          <div className="no-change-page"></div>
        )}
      </section>
    </>
  );
};

export default AllCharacters;
