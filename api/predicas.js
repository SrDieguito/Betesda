export default async function handler(req, res) {
  try {
    const API_KEY = process.env.YT_API_KEY;
    const CHANNEL_HANDLE = "IglesiaBautistaBetesda-p3e";

    // 1. Obtener uploads playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=@${CHANNEL_HANDLE}&key=${API_KEY}`
    );
    
    if (!channelRes.ok) {
      return res.status(404).json({ error: "Canal no encontrado" });
    }
    
    const channelData = await channelRes.json();

    if (!channelData.items?.[0]) {
      return res.status(404).json({ error: "Canal no encontrado" });
    }

    const uploadsId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. Obtener TODOS los videos
    let videos = [];
    let nextPageToken = "";

    do {
      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsId}&pageToken=${nextPageToken}&key=${API_KEY}`
      );
      
      if (!videosRes.ok) {
        break;
      }
      
      const videosData = await videosRes.json();

      const pageVideos = videosData.items.map(v => ({
        id: v.snippet.resourceId.videoId,
        title: v.snippet.title,
        description: v.snippet.description,
        publishedAt: v.snippet.publishedAt,
        thumbnail: v.snippet.thumbnails.high?.url || v.snippet.thumbnails.medium?.url || v.snippet.thumbnails.default?.url
      }));

      videos = videos.concat(pageVideos);
      nextPageToken = videosData.nextPageToken;

    } while (nextPageToken);

    // Ordenar por fecha de publicación (más recientes primero)
    videos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    res.status(200).json(videos);

  } catch (err) {
    console.error("Error cargando prédicas:", err);
    res.status(500).json({ error: "Error cargando prédicas", details: err.message });
  }
}