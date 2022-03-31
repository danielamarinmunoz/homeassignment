import React, { useState, useEffect } from "react";
import TrackRow from "../components/TrackRow";
import AudioPlayer from "../components/AudioPlayer";

const SecondTab = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();

  const handlePlay = (track) => setCurrentTrack(track);

  const deletePlaylist = (playlist) => {  
    debugger;
    fetch('http://localhost:8000/delete/' + playlist.id, {
      method: 'DELETE',
    })
    .then(res => res.json())  
    .then(res => console.log(res))
  };
  useEffect(() => {
    fetch("http://localhost:8000/playlist")
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  return (
    <div className="SecondTab">
      {playlists.map((playlist, ix) => (
           <div> 
             <label for="playlist">Playlist Name:</label> 
             <p id="playlist">{playlist.name}</p>
             <button type="button" onClick={e => {deletePlaylist(playlist)}}>Delete</button>
             {  playlist.track && playlist.track.length > 0 &&
                playlist.track.map((track, ix) => (
                <TrackRow key={ix} track={track} handlePlay={handlePlay} />
                ))
             }
          </div>
        ))}
        {currentTrack && <AudioPlayer track={currentTrack} />}
    </div>
  );
};
export default SecondTab;