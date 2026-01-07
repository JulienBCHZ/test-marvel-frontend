import "./favorits.css";

import AllFavorits from "../../components/AllFavorits/AllFavorits";

import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Favorits = ({ API_URL }) => {
  const getUserToken = Cookies.get("userToken");

  return getUserToken ? (
    <main className="main-favorits">
      <AllFavorits API_URL={API_URL} />
    </main>
  ) : (
    <Navigate to="/auth/login" state={{ from: "/favorits" }} />
  );
};

export default Favorits;
