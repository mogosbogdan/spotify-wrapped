import React, { useState } from "react";
import TopSongs from "./TopSongs";
import {
  Button,
  Switch,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AccordionSummary,
  Accordion,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TopArtists from "./TopArtists";
import "./index.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const App = () => {
  const [showTopSongs, setShowTopSongs] = useState(false);
  const [showTopArtists, setShowTopArtists] = useState(false);

  const [numberOfSongs, setNumberOfSongs] = useState(5);
  const [songsChecked, setSongsChecked] = useState(false);

  const [numberOfArtists, setNumberOfArtists] = useState(5);
  const [artistsChecked, setArtistsChecked] = useState(false);

  const [themePreference, setThemePreference] = useState("system");

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

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode:
            themePreference === "system"
              ? prefersDarkMode
                ? "dark"
                : "light"
              : themePreference,
        },
      }),
    [prefersDarkMode, themePreference]
  );

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

  const handleThemeChange = (event) => {
    setThemePreference(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div component="span">Spotify Wrapped</div>
        </AccordionSummary>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FormControl style={{ margin: "20px" }}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={themePreference}
              onChange={handleThemeChange}
              label="Theme"
            >
              <MenuItem value="system">System</MenuItem>
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Accordion>

      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "100vh",
          backgroundColor: "inherit",
        }}
      >
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
              <p style={{ margin: 0 }}>{toggleSongNumber}</p>
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
              <p style={{ margin: 0 }}>{toggleArtistNumber}</p>
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
