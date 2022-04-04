import React, { useState, useEffect } from "react";
import TrackRow from "../components/TrackRow";
import AudioPlayer from "../components/AudioPlayer";

const SecondTab = () => {
  const[playlists, setPlaylists] = useState([]);
  const[currentTrack, setCurrentTrack] = useState();
  const[counter, setCounter] = useState(0);
  const[namePlaylist, setNamePlaylist] = useState('');
  const[tracks, setNameTracks] = useState([]);
  const handlePlay = (track) => setCurrentTrack(track);

  const deletePlaylist = (playlist) => {  
    fetch('http://localhost:8000/delete/' + playlist.id, {
      method: 'DELETE',
    })
    .then(response =>  {
       loadPLaylist();
       if(response) {
        response.text();
      }
    })  
    .then(response => console.log(response))
  };

  const handleClickAddTRack = () => {
    setCounter(counter + 1); 
  };

  const loadPLaylist = () => { 
    fetch("http://localhost:8000/playlist")
      .then((res) => res.json())
      .then((data) => setPlaylists(data)); 
  }

  useEffect(() => {
    loadPLaylist();
  }, []);

  const trackWithIds  = (array) => { 
      return array.map(item => {
        return { name: item, id: Math.random().toString(36).slice(2).substr(0, 10)};
      })
  }

  const handleSubmission = (e) => { 
    let data = {
      name: namePlaylist,
      id: Math.random().toString(36).slice(2).substr(0, 10), 
      track: trackWithIds(tracks)
    }
    
    fetch('http://localhost:8000/create', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => { 
      loadPLaylist();
      if(response) {
        response.text();
      }
    }) 
    .then(json => console.log(json))
    .catch(err => console.log(err));
  }

  return (
    <div className="SecondTab">
      <form>
        <ul>
          <li>
            <label for="name">Name Playlist:</label>
            <input type="text" id="name" name="user_name" onChange={e => {setNamePlaylist(e.target.value)}} />
          </li>
          <li>
            <button type="button" onClick={handleClickAddTRack}>Add track</button>
            {Array.from(Array(counter)).map((c, index) => {
              return <input key={c} type="text" onBlur={e => { setNameTracks(tracks => [...tracks, e.target.value])}} ></input>;
            })}
          </li>
        </ul>
        <button type="button" onClick={handleSubmission} >Create</button>
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