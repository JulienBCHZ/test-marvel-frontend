import "./home.css";

import MainHero from "../../components/MainHero/MainHero";
import Main from "../../components/Main/Main";

const Home = ({ API_URL }) => {
  return (
    <main>
      <MainHero API_URL={API_URL} />
      <Main API_URL={API_URL} />
    </main>
  );
};

export default Home;
