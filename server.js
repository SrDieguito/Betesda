import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = process.env.YT_API_KEY; // usa .env
const CHANNEL_HANDLE = "IglesiaBautistaBetesda-p3e";

// 1️⃣ obtener uploads playlist
async function getUploadsPlaylistId() {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=@${CHANNEL_HANDLE}&key=${API_KEY}`;
  const r = await fetch(url);
  const d = await r.json();

  return d.items[0].contentDetails.relatedPlaylists.uploads;
}

// 2️⃣ obtener videos
async function getVideos() {
  const uploadsId = await getUploadsPlaylistId();

  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${uploadsId}&key=${API_KEY}`;
  const r = await fetch(url);
  const d = await r.json();

  return d.items.map(v => ({
    id: v.snippet.resourceId.videoId,
    title: v.snippet.title,
    description: v.snippet.description,
    publishedAt: v.snippet.publishedAt,
    thumbnail: v.snippet.thumbnails.medium.url
  }));
}

// 3️⃣ endpoint público
app.get("/api/predicas", async (req, res) => {
  try {
    const videos = await getVideos();
    res.json(videos);
  } catch (e) {
    res.status(500).json({ error: "Error al cargar prédicas" });
  }
});

app.listen(3000, () =>
  console.log("✅ Backend activo en http://localhost:3000")
);
