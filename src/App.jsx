import React, { useState } from "react";
import TopSongs from "./TopSongs";
import { Button, Switch } from "@mui/material";
import TopArtists from "./TopArtists";

const App = () => {
  const [showTopSongs, setShowTopSongs] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(false);

  const [numberOfSongs, setNumberOfSongs] = useState(100);
  const [songsChecked, setSongsChecked] = useState(false);

  const [numberOfArtists, setNumberOfArtists] = useState(100);
  const [artistsChecked, setArtistsChecked] = useState(false);

  const handleTopSongs = () => {
    setShowTopSongs(!showTopSongs);
  };

  const handleTopArtists = () => {
    setShowTopArtists(!showTopArtists);
  };

  const handleChangeNumberOfSongs = (e) => {
    setSongsChecked(e.target.checked);
    if (numberOfSongs === 100) {
      setNumberOfSongs(5);
    } else {
      setNumberOfSongs(100);
    }
  };

  const handleChangeNumberOfArtists = (e) => {
    setArtistsChecked(e.target.checked);
    if (numberOfArtists === 100) {
      setNumberOfArtists(5);
    } else {
      setNumberOfArtists(100);
    }
  };

  return (
    <div style={{ overflowY: "scroll", overflowX: "hidden", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            variant="contained"
            onClick={handleTopSongs}
            style={{ margin: "20px" }}
          >
            show top songs
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "20px",
              justifyContent: "space-between",
            }}
          >
            <p>
              {numberOfSongs === 100 ? "See fewer songs" : "See more songs"}
            </p>
            <Switch
              checked={songsChecked}
              onChange={handleChangeNumberOfSongs}
              disabled={!showTopSongs}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button
            variant="contained"
            onClick={handleTopArtists}
            style={{ margin: "20px" }}
          >
            show top artists
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "20px",
              justifyContent: "space-between",
            }}
          >
            <p>
              {numberOfArtists === 100
                ? "See fewer artists"
                : "See more artists"}
            </p>
            <Switch
              checked={artistsChecked}
              onChange={handleChangeNumberOfArtists}
              disabled={!showTopArtists}
            />
          </div>
        </div>
      </div>
      {showTopSongs && <TopSongs numberOfSongs={numberOfSongs} />}
      {showTopArtists && <TopArtists numberOfArtists={numberOfArtists} />}
    </div>
  );
};

export default App;
