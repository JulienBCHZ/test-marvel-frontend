import "./mainhero.css";

import { useState, useEffect } from "react";
import axios from "axios";

import getImage from "../../utils/getImage";

import { TfiFaceSad } from "react-icons/tfi";

const MainHero = ({ API_URL }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/characters?limit=3`);
        if (response.data) {
          // console.log("RES :", response.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setErrorMessage("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(true);
        console.log("MH ERROR : ", error);
        if (error.message) {
          setErrorMessage(`Something went wrong : ${error.message}`);
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
