import React, { useState } from "react";
import TopSongs from "./TopSongs";
import { Button } from "@mui/material";
import TopArtists from "./TopArtists";

const App = () => {
  const [showTopSongs, setShowTopSongs] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(false);

  const [numberOfSongs, setNumberOfSongs] = useState(100);
  const [numberOfArtists, setNumberOfArtists] = useState(100);

  const handleTopSongs = () => {
    setShowTopSongs(!showTopSongs);
  };

  const handleTopArtists = () => {
    setShowTopArtists(!showTopArtists);
  };

  const handleChangeNumberOfSongs = () => {
    if (numberOfSongs === 100) {
      setNumberOfSongs(5);
    } else {
      setNumberOfSongs(100);
    }
  };

  const handleChangeNumberOfArtists = () => {
    if (numberOfArtists === 100) {
      setNumberOfArtists(5);
    } else {
      setNumberOfArtists(100);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            variant="contained"
            onClick={handleTopSongs}
            style={{ margin: "20px" }}
          >
            show top songs
          </Button>
          <Button
            variant="outlined"
            onClick={handleChangeNumberOfSongs}
            style={{ margin: "20px" }}
            disabled={!showTopSongs}
          >{`Show ${numberOfSongs === 100 ? 5 : 100} songs`}</Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            variant="contained"
            onClick={handleTopArtists}
            style={{ margin: "20px" }}
          >
            show top artists
          </Button>
          <Button
            variant="outlined"
            onClick={handleChangeNumberOfArtists}
            style={{ margin: "20px" }}
            disabled={!showTopArtists}
          >{`Show ${numberOfArtists === 100 ? 5 : 100} artists`}</Button>
        </div>
      </div>
      {showTopSongs && <TopSongs numberOfSongs={numberOfSongs} />}
      {showTopArtists && <TopArtists numberOfArtists={numberOfArtists} />}
    </div>
  );
};

export default App;
