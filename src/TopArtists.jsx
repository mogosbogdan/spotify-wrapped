import React from "react";
import data from "./db/StreamingHistory_music_0.json";
import { formatTime } from "./utils";

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
          <div
            style={{
              border: "1px solid black",
              padding: "10px",
              borderRadius: "6px",
              flex: "1 0 17%", // Adjust the percentage to control the number of items per row
              margin: "10px",
              boxSizing: "border-box",
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
