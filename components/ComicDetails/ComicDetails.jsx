import "./comicdetails.css";

import { useState, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import getImage from "../../utils/getImage";

const ComicDetails = () => {
  const params = useParams();
  const { comicId } = params;
  console.log(comicId);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--project-marvel-backend--hgkxb6f276xk.code.run/comic/${comicId}`
      );
      console.log(response.data.data);
      setData(response.data.data);
      setIsLoading(false);
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
