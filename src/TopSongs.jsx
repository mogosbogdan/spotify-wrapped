import React from "react";
import data from "./db/StreamingHistory_music_0.json";
import { formatTime } from "./utils";
import "./index.css";

const TopSongs = ({ numberOfSongs }) => {
  const combinedData = React.useMemo(() => {
    return data.reduce((acc, current) => {
      const existing = acc.find((item) => item.trackName === current.trackName);
      if (existing) {
        existing.msPlayed += current.msPlayed;
      } else {
        acc.push({ ...current });
      }
      return acc;
    }, []);
  }, [data]);

  const sortedData = combinedData.sort((a, b) => b.msPlayed - a.msPlayed);

  return (
    <>
      <h1
        style={{
          margin: "10px",
          textAlign: "center",
        }}
      >
        Top {numberOfSongs} Songs
      </h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {sortedData.slice(0, numberOfSongs).map((item, index) => {
          return (
            <div key={index} className="top">
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
                <iframe
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/track/${item.trackUri}`}
                  width="100%"
                  height="152"
                  allowfullscreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TopSongs;
