import "./favorits.css";

import AllFavorits from "../../components/AllFavorits/AllFavorits";

import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Favorits = () => {
  const getUserToken = Cookies.get("userToken");

  return getUserToken ? (
    <main className="main-favorits">
      <AllFavorits />
    </main>
  ) : (
    <Navigate to="/auth/login" state={{ from: "/favorits" }} />
  );
};

export default Favorits;
