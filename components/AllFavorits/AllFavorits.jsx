import "./allfavorits.css";

import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import { TfiFaceSad } from "react-icons/tfi";

const AllFavorits = ({ API_URL }) => {
  const getUserToken = Cookies.get("userToken");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/favorits`, {
          headers: {
            authorization: `Bearer ${getUserToken}`,
          },
        });
        if (response.data) {
          console.log("FAV DATA : ", response.data);
          setData(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert("Server doesn't respond...");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("FAV ERROR : ", error);
        error.message
          ? alert("Something went wrong : ", error.message)
          : alert("Something went wrong...");
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
