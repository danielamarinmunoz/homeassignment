import React, { useState, useEffect } from "react";
import TrackRow from "../components/TrackRow";
import AudioPlayer from "../components/AudioPlayer";

const SecondTab = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [counter, setCounter] = useState(0);

  const handlePlay = (track) => setCurrentTrack(track);

  const deletePlaylist = (playlist) => {  
    debugger;
    fetch('http://localhost:8000/delete/' + playlist.id, {
      method: 'DELETE',
    })
    .then(res => res.json())  
    .then(res => console.log(res))
  };
  const handleClick = () => {
    setCounter(counter + 1); 
  };

  useEffect(() => {
    fetch("http://localhost:8000/playlist")
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, []);

  return (
    <div className="SecondTab">
      <form action="/create" method="post">
        <ul>
          <li>
            <label for="name">Name:</label>
            <input type="text" id="name" name="user_name" />
          </li>
          <li>
            <label for="mail">E-mail:</label>
            <input type="email" id="mail" name="user_email" />
          </li>
          <li>
            <label for="msg">Message:</label>
            <textarea id="msg" name="user_message"></textarea>
          </li>
          <li>
            <button type="button" onClick={handleClick}>Hello</button>
            {Array.from(Array(counter)).map((c, index) => {
              return <input key={c} type="text"></input>;
            })}
          </li>
        </ul>
        <button type="submit"  value="Submit">Create</button>
      </form>
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