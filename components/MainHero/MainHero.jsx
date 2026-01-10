import "./mainhero.css";

import { useState, useEffect } from "react";
import axios from "axios";

import getImage from "../../utils/getImage";

const MainHero = ({ API_URL }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/characters?limit=40`);
        if (response.data) {
          // console.log("RES :", response.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(true);
        console.log("MH ERROR : ", error);
        if (error.message) {
          alert(`Something went wrong : ${error.message}`);
        } else {
          alert("Something went wrong...");
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
    <section className="hero-carousel">
      <div className="characters-group">
        <div className="picture-card">
          <img
            src={getImage(data.results[0].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[4].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[7].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[30].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[12].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[36].thumbnail)}
            className="hero-image"
          />
        </div>
      </div>
      <div aria-hidden className="characters-group hidden-group">
        <div className="picture-card">
          <img
            src={getImage(data.results[0].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[4].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[7].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[30].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[12].thumbnail)}
            className="hero-image"
          />
        </div>
        <div className="picture-card">
          <img
            src={getImage(data.results[36].thumbnail)}
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default MainHero;
