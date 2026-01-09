import "./main.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

import { TfiFaceSad } from "react-icons/tfi";

const Main = ({ API_URL }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  console.log("URL :", API_URL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/comics?limit=15`);
        if (response.data) {
          // console.log("DATA : ", response.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("MAIN ERROR : ", error);
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
    <section className="loadingMain">
      <p>Please wait...</p>
    </section>
  ) : (
    <section className="comics-preview-section">
      <Link to="/comics" className="read-comics-link">
        <h1>OUT NOW</h1>
      </Link>
      <div className="carrousel">
        {data.results.map((comics) => {
          return (
            <img
              src={getImage(comics.thumbnail)}
              alt="comics"
              className="comics-image"
              key={comics._id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Main;
