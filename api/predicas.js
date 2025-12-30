export default async function handler(req, res) {
  try {
    const API_KEY = process.env.YT_API_KEY;
    const CHANNEL_HANDLE = "IglesiaBautistaBetesda-p3e";

    // 1️⃣ Obtener uploads playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=@${CHANNEL_HANDLE}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();

    const uploadsId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // 2️⃣ Obtener TODOS los videos (paginación)
    let videos = [];
    let nextPageToken = "";

    do {
      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsId}&pageToken=${nextPageToken}&key=${API_KEY}`
      );
      const videosData = await videosRes.json();

      const pageVideos = videosData.items.map(v => ({
        id: v.snippet.resourceId.videoId,
        title: v.snippet.title,
        description: v.snippet.description,
        publishedAt: v.snippet.publishedAt,
        thumbnail: v.snippet.thumbnails.medium.url
      }));

      videos = videos.concat(pageVideos);
      nextPageToken = videosData.nextPageToken;

    } while (nextPageToken);

    res.status(200).json(videos);

  } catch (err) {
    res.status(500).json({ error: "Error cargando prédicas" });
  }
}
