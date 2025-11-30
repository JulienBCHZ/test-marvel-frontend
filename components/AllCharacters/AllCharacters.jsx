import "./allcharacters.css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

// search={search} setSearch={setSearch}
const AllCharacters = ({ search, setSearch }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--project-marvel-backend--hgkxb6f276xk.code.run/characters?page=${page}&name=${search}`
        );

        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        error.response
          ? setErrorMessage(error.response.data.message)
          : console.log(error);
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
      {errorMessage ? (
        <p>{errorMessage}</p>
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
      )}
    </>
  );
};

export default AllCharacters;
