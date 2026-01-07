import "./mainhero.css";

import { useState, useEffect } from "react";
import axios from "axios";

import getImage from "../../utils/getImage";

import { TfiFaceSad } from "react-icons/tfi";

const MainHero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--project-marvel-backend--hgkxb6f276xk.code.run/characters?limit=3`
        );
        if (response.data) {
          // console.log("RES :", response.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setErrorMessage("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("MH ERROR : ", error);
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
  }, []);

  return isLoading ? (
    <section className="loading">
      <p>Please wait...</p>
    </section>
  ) : errorMessage ? (
    <div className="error">
      <p>{errorMessage}</p>
      <TfiFaceSad style="font-size: 4wv; color: grey" />
    </div>
  ) : (
    <section className="hero">
      {data.results.map((character) => {
        return (
          <img
            src={getImage(character.thumbnail)}
            alt="character"
            className="hero-image"
            key={character._id}
          />
        );
      })}
    </section>
  );
};

export default MainHero;
