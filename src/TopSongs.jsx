import React from "react";
import { formatTime } from "./utils";

const TopSongs = ({ data, numberOfSongs }) => {
  // Step 1: Aggregate playtime for each song
  const aggregatedData = data.reduce((acc, item) => {
    const key = `${item.artistName}-${item.trackName}`;
    if (!acc[key]) {
      acc[key] = { ...item, msPlayed: 0 };
    }
    acc[key].msPlayed += item.msPlayed;
    return acc;
  }, {});

  // Step 2: Convert the aggregated object back to an array and sort it
  const sortedData = Object.values(aggregatedData).sort(
    (a, b) => b.msPlayed - a.msPlayed
  );

  return (
    <>
      <h1
        style={{
          margin: "10px",
        }}
      >
        Top {numberOfSongs} Songs
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {sortedData.slice(0, numberOfSongs).map((item, index) => {
          return (
            <div
              style={{
                flex: "1 0 17%", // Adjust the percentage to control the number of items per row
                margin: "10px",
                boxSizing: "border-box",
              }}
              key={index}
              className="top-songs"
            >
              <div
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  borderRadius: "6px",
                }}
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
                <p>{item.artistName}</p>
                <p>{item.trackName}</p>
                <p>{formatTime(item.msPlayed)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TopSongs;
