import "./main.css";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

import { TfiFaceSad } from "react-icons/tfi";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--project-marvel-backend--hgkxb6f276xk.code.run/comics?limit=15`
        );
        if (response.data) {
          // console.log("DATA : ", response.data);
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
    <section className="loadingMain">
      <p>Please wait...</p>
    </section>
  ) : errorMessage ? (
    <div className="errorMain">
      <p>{errorMessage}</p>
      <TfiFaceSad style="font-size: 4wv; color: grey" />
    </div>
  ) : (
    <section className="comics-preview-section">
      <Link to="/comics" className="read-comics-link">
        <h1>READ NOW</h1>
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
