import "../style/globals.css";
import {render} from "preact";
import CurrentlyPlayingProvider from "./context/CurrentlyPlayingContext";
import Popup from "./popup";

function App() {
  return (
    <CurrentlyPlayingProvider>
      <Popup />
    </CurrentlyPlayingProvider>
  );
}

render(<App />, document.getElementById("root") || document.body);
