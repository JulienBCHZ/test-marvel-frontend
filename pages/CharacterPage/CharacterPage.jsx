import "./characterpage.css";

import CharacterDetails from "../../components/CharacterDetails/CharacterDetails";

import { useState, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";

//  name: characters.name,
//                 description: characters.description,
//                 image: characters.thumbnail,
//                 comics: characters.comics,

// {
//     "name": "3-D Man",
//     "description": "",
//     "image": "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg",
//     "comics": [
//         "5fce213378edeb0017c9602f",
//         "5fce213478edeb0017c96040",
//         "5fce20fe78edeb0017c95fb7",
//         "5fce20e078edeb0017c95f01",
//         "5fce20ab78edeb0017c95e56",
//         "5fce207678edeb0017c95d8b",
//         "5fce207678edeb0017c95d8c",
//         "5fce202078edeb0017c95c8e",
//         "5fce292678edeb0017c97e05",
//         "5fce31ee78edeb0017c9a305",
//         "5fce31dc78edeb0017c9a2b0",
//         "5fce31c778edeb0017c9a276"
//     ]
// }

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
