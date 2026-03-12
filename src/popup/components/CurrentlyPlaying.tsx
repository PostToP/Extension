import {useContext} from "preact/hooks";
import {CurrentlyPlayingContext} from "../context/CurrentlyPlayingContext";
import LoadingIco from "./LoadingIco";
import formatNER from "./NER";
import Timeline from "./Timeline";
import YoutubeThumbnail from "./YoutubeTumbnail";

export function CurrentlyPlayingData() {
  const currentlyPlaying = useContext(CurrentlyPlayingContext);

  if (!currentlyPlaying?.watchID) {
    return <div className={"text-center text-gray-500"}>No track playing</div>;
  }

  const {title, subtitle} = formatNER(
    currentlyPlaying?.NER || {
      ORIGINAL_AUTHOR: [],
      TITLE: [],
      FEATURING: [],
      MODIFIER: [],
      VOCALOID: [],
      MISC_PERSON: [],
      VOCALIST: [],
      ALT_TITLE: [],
      ALBUM: [],
    },
    currentlyPlaying?.trackName || "No track playing",
    currentlyPlaying?.artistName || "Unknown Artist",
  );

  return (
    <div className={"size-full p-4"}>
      <YoutubeThumbnail imgURL={currentlyPlaying?.cover || ""} />
      <div>
        <div className={"line-clamp-1 text-center font-bold text-lg"}>
          <span title={title}>{title}</span>
        </div>
        <div className={"line-clamp-1 text-center font-semibold text-md"}>
          <span title={subtitle}>by {subtitle}</span>
        </div>
        {currentlyPlaying?.NER === undefined && (
          <div className={"line-clamp-1 text-center font-extralight text-sm"}>
            Recognizing track info... <br />
            <LoadingIco />
          </div>
        )}
        <div>
          <Timeline
            currentTime={currentlyPlaying?.time || 0}
            duration={currentlyPlaying?.length || 0}
            playbackStatus={currentlyPlaying?.status || 1}
          />
        </div>
      </div>
    </div>
  );
}
