import "./allfavorits.css";

import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import { TfiFaceSad } from "react-icons/tfi";

const AllFavorits = () => {
  const getUserToken = Cookies.get("userToken");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--project-marvel-backend--hgkxb6f276xk.code.run/user/favorits`,
          {
            headers: {
              authorization: `Bearer ${getUserToken}`,
            },
          }
        );
        if (response.data) {
          console.log("FAV DATA : ", response.data);
          setData(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setErrorMessage("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("FAV ERROR : ", error);
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
    <section className="loadingFavorits">
      <p>Please wait...</p>
    </section>
  ) : (
    <div className="all-favorits-vision">
      <section className="favorit-container">
        {data.favorits.map((favorit) => {
          return (
            <div className="favorit-preview" key={favorit._id}>
              <img src={favorit.item_image} alt="item-picture" />
              <div className="favorit-details">
                <h2>{favorit.item_title}</h2>
                <p>{favorit.item_description}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default AllFavorits;
