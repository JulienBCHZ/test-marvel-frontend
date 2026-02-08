import CharacterDetails from "../../components/CharacterDetails/CharacterDetails";

import { useLocation } from "react-router-dom";

const CharacterPage = ({ API_URL }) => {
  // const params = useParams();
  // const { characterId } = params;
  // console.log(characterId);

  const characterDetails = useLocation();
  const { name, description, image, comics } = characterDetails.state;

  console.log("DETAILS :", characterDetails.state);

  return (
    <main className="main-charac-page">
      <CharacterDetails
        name={name}
        description={description}
        image={image}
        API_URL={API_URL}
      />
    </main>
  );
};

export default CharacterPage;
