
import React, { useState, useEffect } from "react";
import TrackRow from "../components/TrackRow";
import AudioPlayer from "../components/AudioPlayer";
 
const FirstTab = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  const handlePlay = (track) => setCurrentTrack(track);

  useEffect(() => {
    fetch("http://localhost:8000/tracks")
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  return (
    <div className="FirstTab">
      {tracks.map((track, ix) => (
          <TrackRow key={ix} track={track} handlePlay={handlePlay} />
        ))}
       {currentTrack && <AudioPlayer track={currentTrack} />}
    </div>
  );
};
export default FirstTab;
