import React from "react";
import data from "./db/StreamingHistory_music_0.json";
import { formatTime } from "./utils";
import Card from "@mui/material/Card";

const TopArtists = ({ numberOfArtists }) => {
  const artistPlayTime = {};

  data.forEach((entry) => {
    const artistName = entry.artistName;
    const msPlayed = entry.msPlayed;

    if (!artistPlayTime[artistName]) {
      artistPlayTime[artistName] = 0;
    }

    artistPlayTime[artistName] += msPlayed;
  });

  const topArtists = Object.entries(artistPlayTime)
    .sort((a, b) => b[1] - a[1])
    .slice(0, numberOfArtists)
    .map(([artist]) => artist);

  return (
    <div>
      <h1
        style={{
          margin: "10px",
        }}
      >
        Top {numberOfArtists} Artists
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {topArtists.map((artist, index) => (
          <Card
            sx={{
              padding: "10px",
              borderRadius: "6px",
              flex: "1 0 17%", // Adjust the percentage to control the number of items per row
              margin: "10px",
              boxSizing: "border-box",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
            key={index}
          >
            <p
              style={{
                border: "1px solid black",
                width: "30px",
                textAlign: "center",
                borderRadius: "6px",
              }}
            >
              {index + 1}
            </p>
            <p>{artist}</p>
            <p>{formatTime(artistPlayTime[artist])}</p>
            {/* to do: add spotify iframe for top artists */}
            {/* <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/artist/3y2cIKLjiOlp1Np37WiUdH?utm_source=generator"
              width="100%"
              height="152"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe> */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
