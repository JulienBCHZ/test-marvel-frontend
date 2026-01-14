import "./characterdetails.css";

import { useState, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

// [
//     {
//         "thumbnail": {
//             "path": "http://i.annihil.us/u/prod/marvel/i/mg/2/00/5ba3bfcc55f5a",
//             "extension": "jpg"
//         },
//         "_id": "5fce17e278edeb0017c93def",
//         "title": "Hulk (2008) #53",
//         "description": "The Mayan Gods are here! Guest starring Alpha Flight, Machine Man, She-Hulks, A-Bomb!",
//         "__v": 0
//     },
//     {
//         "thumbnail": {
//             "path": "http://i.annihil.us/u/prod/marvel/i/mg/f/00/5ba3c7cd5f1e2",
//             "extension": "jpg"
//         },
//         "_id": "5fce17ca78edeb0017c93da2",
//         "title": "Hulk (2008) #54",
//         "description": "Mayan Gods! End of the world as we know it! Guest starring Alpha Flight, Machine Man, She-Hulks, A-Bomb!",
//         "__v": 0
//     },
//     {
//         "thumbnail": {
//             "path": "http://i.annihil.us/u/prod/marvel/i/mg/6/60/5ba3d0869c543",
//             "extension": "jpg"
//         },
//         "_id": "5fce17c878edeb0017c93d62",
//         "title": "Hulk (2008) #55",
//         "description": "The hands of the doomsday clock race towards MAYAN RULE! Former Avengers arrive to help stop the end of the world as more Mayan gods return. Rick \"A-Bomb\" Jones falls in battle!",
//         "__v": 0
//     }
// ]

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
          <img src={image} alt="character" />
          <div className="charact-info-details">
            <h2>{name}</h2>
            {description === "" ? (
              <p>Description is coming...</p>
            ) : (
              <p>{description}</p>
            )}
            {/* <p>{description}</p> */}
          </div>
        </div>
      </section>
      {data.comics.length > 0 ? (
        <h2 className="charact-page-title">APPEARS ON</h2>
      ) : (
        <h2 className="charact-page-title"></h2>
      )}
      {/* <h2 className="charact-page-title">APPEARS ON</h2> */}
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
