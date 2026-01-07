import "./comicpage.css";

import ComicDetails from "../../components/ComicDetails/ComicDetails";

const ComicPage = ({ API_URL }) => {
  return (
    <main ClassName="main-comic">
      <div className="comic-page-main-deco">
        <ComicDetails API_URL={API_URL} />
      </div>
    </main>
  );
};

export default ComicPage;
