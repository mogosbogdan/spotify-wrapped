import React from "react";
import { formatTime } from "./utils";

const TopArtists = ({ data, numberOfArtists }) => {
  const artistPlayTime = data.reduce((acc, item) => {
    acc[item.artistName] = (acc[item.artistName] || 0) + item.msPlayed;
    return acc;
  }, {});

  const sortedArtists = Object.entries(artistPlayTime)
    .sort(([, timeA], [, timeB]) => timeB - timeA)
    .slice(0, numberOfArtists)
    .map(([artist, totalPlayTime]) => ({ artist, totalPlayTime }));

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
        {sortedArtists.map((artist, index) => (
          <div
            style={{
              border: "1px solid black",
              padding: "10px",
              borderRadius: "6px",
              flex: "1 0 17%",
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
            <p>{artist.artist}</p>
            <p>{formatTime(artist.totalPlayTime)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
