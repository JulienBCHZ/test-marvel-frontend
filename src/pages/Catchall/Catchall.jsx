import "./catchall.css";

import { TfiFaceSad } from "react-icons/tfi";
import { GiSpiderMask } from "react-icons/gi";

function Catchall() {
  return (
    <main>
      <info className="catchall-container">
        <p className="catchall-message">Route doesn't exist...</p>
        <GiSpiderMask className="catchall-icon" />
      </info>
    </main>
  );
}

export default Catchall;
