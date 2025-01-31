import React, { useState } from "react";
import TopSongs from "./TopSongs";
import { Button, Switch, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import TopArtists from "./TopArtists";
import "./index.css";
import useMediaQuery from '@mui/material/useMediaQuery';

const App = () => {
  const [showTopSongs, setShowTopSongs] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(false);

  const [numberOfSongs, setNumberOfSongs] = useState(5);
  const [songsChecked, setSongsChecked] = useState(false);

  const [numberOfArtists, setNumberOfArtists] = useState(5);
  const [artistsChecked, setArtistsChecked] = useState(false);

  const moreSongs = numberOfSongs === 5;
  const toggleSongNumber = moreSongs ? "See more songs" : "See fewer songs";
  const toggleSongText = showTopSongs ? "Hide Top Songs" : "Show Top Songs";

  const moreArtists = numberOfArtists === 5;
  const toggleArtistNumber = moreArtists
    ? "See more artists"
    : "See fewer artists";
  const toggleArtistText = showTopArtists
    ? "Hide Top Artists"
    : "Show Top Artists";

  const handleTopSongs = (e) => {
    setShowTopSongs(!showTopSongs);
    setSongsChecked(false);
  };

  const handleTopArtists = () => {
    setShowTopArtists(!showTopArtists);
    setArtistsChecked(false);
  };

  const handleChangeNumberOfSongs = (e) => {
    setSongsChecked(e.target.checked);
    if (numberOfSongs === 5) {
      setNumberOfSongs(100);
    } else {
      setNumberOfSongs(5);
    }
  };

  const handleChangeNumberOfArtists = (e) => {
    setArtistsChecked(e.target.checked);
    if (numberOfArtists === 5) {
      setNumberOfArtists(100);
    } else {
      setNumberOfArtists(5);
    }
  };

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ overflowY: "scroll", overflowX: "hidden", height: "100vh", backgroundColor: 'inherit' }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              variant="contained"
              onClick={handleTopSongs}
              style={{ margin: "20px", height: "50px" }}
            >
              {toggleSongText}
            </Button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "20px",
              }}
            >
              <p>{toggleSongNumber}</p>
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
              style={{ margin: "20px", height: "50px" }}
            >
              {toggleArtistText}
            </Button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "20px",
              }}
            >
              <p>{toggleArtistNumber}</p>
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
    </ThemeProvider>
  );
};

export default App;
