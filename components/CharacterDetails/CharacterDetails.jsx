import "./characterdetails.css";

import { useState, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import axios from "axios";

// name={name}
//     description={description}
//     image={image}
//     comics={comics}

const CharacterDetails = ({ name, description, image, comics }) => {
  const params = useParams();
  const { characterId } = params;
  console.log(characterId);
  //   console.log(comics);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--project-marvel-backend--hgkxb6f276xk.code.run/comics/${characterId}`
      );
      console.log(response.data);
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <section className="loading">
      <p>Please wait...</p>
    </section>
  ) : (
    <section className="comics-character-vision">
      <div className="comics-charact-container">
        <div className="comics-charact">
          <img src={image} alt="character" />
          <div className="comics-charact-details">
            <h2>{name}</h2>
            {/* <p>{characters.description}</p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterDetails;
