import "./comicdetails.css";

import { useState, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

const ComicDetails = ({ API_URL }) => {
  const params = useParams();
  const { comicId } = params;
  console.log(comicId);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/comic/${comicId}`);
        if (response.data) {
          // console.log("COMIC : ", response.data.data);
          setData(response.data.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setErrorMessage("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("COMIC ERROR : ", error);
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
    <section className="loading-comic-page">
      <p>Please wait...</p>
    </section>
  ) : (
    <div className="comic-page-container">
      <section className="comic-page-vision">
        <img src={getImage(data.thumbnail)} />
        <div className="comics-vision-details">
          <h2>{data.title}</h2>
          {data.description === null ? (
            <p>Description is coming...</p>
          ) : (
            <p>{data.description}</p>
          )}
          {/* <p>{data.description}</p> */}
        </div>
      </section>
    </div>
  );
};

export default ComicDetails;
