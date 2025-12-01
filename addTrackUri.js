import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = __dirname;

const libraryPath = path.join(root, "src", "db", "YourLibrary.json");
const historyPath = path.join(
  root,
  "src",
  "db",
  "StreamingHistory_music_0.json"
);

function normalize(artist, track) {
  return `${(artist || "").toString().toLowerCase().trim()}||${(track || "")
    .toString()
    .toLowerCase()
    .trim()}`;
}

function main() {
  const libraryRaw = fs.readFileSync(libraryPath, "utf8");
  const historyRaw = fs.readFileSync(historyPath, "utf8");

  const library = JSON.parse(libraryRaw);
  const history = JSON.parse(historyRaw);

  const tracks = Array.isArray(library.tracks) ? library.tracks : [];

  const libMap = new Map();
  for (const t of tracks) {
    const key = normalize(t.artist, t.track);
    if (!key) continue;
    if (!libMap.has(key)) {
      libMap.set(key, t.uri);
    }
  }

  let matched = 0;
  let total = 0;

  const updatedHistory = history.map((entry) => {
    total += 1;
    const key = normalize(entry.artistName, entry.trackName);
    const uri = libMap.get(key);
    if (uri) {
      matched += 1;
      return { ...entry, trackUri: uri };
    }
    return entry;
  });

  fs.writeFileSync(
    historyPath,
    JSON.stringify(updatedHistory, null, 2),
    "utf8"
  );

  console.log(
    `Updated StreamingHistory_music_0.json with trackUri for ${matched} out of ${total} entries.`
  );
}

main();
