import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

const CharacterDetails = ({ name, description, image, API_URL }) => {
  const params = useParams();
  const { characterId } = params;
  // console.log(characterId);
  //   console.log(comics);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorit, setFavorit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/comics/${characterId}`);
        if (response.data) {
          //   console.log("CHAR :", response.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("CHAR ERROR : ", error);
        error.response
          ? alert(error.response.data.message)
          : alert("Something went wrong...");
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <section className="loading">
      <p>Please wait...</p>
    </section>
  ) : (
    <div className="comics-character-vision">
      <section className="character-container">
        <div className="character-infos">
          {favorit ? (
            <MdFavorite className="charac-details-remove-favorit" />
          ) : (
            <MdFavoriteBorder className="charac-details-add-favorit" />
          )}
          <div className="charac-details-favorit-hidden">
            {favorit ? (
              <MdFavorite className="charac-details-remove-favorit-hidden" />
            ) : (
              <MdFavoriteBorder className="charac-details-add-favorit-hidden" />
            )}
          </div>
          <img src={image} alt="character" />
          <div className="charact-info-details">
            <h2>{name}</h2>
            {description === "" ? (
              <p>Description is coming...</p>
            ) : (
              <p>{description}</p>
            )}
          </div>
        </div>
      </section>
      {data.comics.length > 0 ? (
        <h2 className="charact-page-title">APPEARS ON</h2>
      ) : (
        <h2 className="charact-page-title"></h2>
      )}
      <section className="comics-character-container">
        {data.comics.map((comic) => {
          return (
            <section key={comic._id}>
              <Link
                to={`/comics/comic/${comic._id}`}
                className="comic-with-character"
              >
                <img src={getImage(comic.thumbnail)} alt="comic cover" />
                <h3>{comic.title}</h3>
              </Link>
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default CharacterDetails;
