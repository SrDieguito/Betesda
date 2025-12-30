// api/predicas.js - Backend mejorado
export default async function handler(req, res) {
  try {
    const API_KEY = process.env.YT_API_KEY;
    const CHANNEL_HANDLE = "IglesiaBautistaBetesda-p3e";

    // 1. Obtener uploads playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet,statistics&forHandle=@${CHANNEL_HANDLE}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();

    if (!channelData.items?.[0]) {
      return res.status(404).json({ error: "Canal no encontrado" });
    }

    const uploadsId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    const channelStats = channelData.items[0].statistics;

    // 2. Obtener TODOS los videos con estadísticas
    let videos = [];
    let nextPageToken = "";

    do {
      const videosRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsId}&pageToken=${nextPageToken}&key=${API_KEY}`
      );
      const videosData = await videosRes.json();

      // Obtener estadísticas para cada lote de videos
      const videoIds = videosData.items.map(v => v.snippet.resourceId.videoId).join(',');
      
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
      );
      const statsData = await statsRes.json();

      // Crear mapa de estadísticas por video
      const statsMap = {};
      statsData.items.forEach(video => {
        statsMap[video.id] = {
          viewCount: parseInt(video.statistics.viewCount || 0),
          likeCount: parseInt(video.statistics.likeCount || 0),
          duration: parseDuration(video.contentDetails.duration)
        };
      });

      const pageVideos = videosData.items.map(v => {
        const videoId = v.snippet.resourceId.videoId;
        const stats = statsMap[videoId] || {};
        
        // Detectar serie por título (puedes personalizar esto)
        let series = "general";
        const title = v.snippet.title.toLowerCase();
        
        if (title.includes("evangelio") || title.includes("juan")) series = "evangelio";
        else if (title.includes("salmos") || title.includes("salmo")) series = "salmos";
        else if (title.includes("familia") || title.includes("matrimonio")) series = "familia";
        else if (title.includes("oración") || title.includes("orando")) series = "oracion";
        
        // Extraer versículo si está en el título
        const verseMatch = v.snippet.title.match(/\d?\s?[A-Za-z]+\.?\s\d+:\d+/);
        
        return {
          id: videoId,
          title: v.snippet.title,
          description: v.snippet.description,
          publishedAt: v.snippet.publishedAt,
          thumbnail: v.snippet.thumbnails.high?.url || v.snippet.thumbnails.medium.url,
          viewCount: stats.viewCount || 0,
          likeCount: stats.likeCount || 0,
          duration: stats.duration || 0,
          durationFormatted: formatDuration(stats.duration || 0),
          series: series,
          verse: verseMatch ? verseMatch[0] : null,
          channelViews: parseInt(channelStats.viewCount || 0),
          channelSubscribers: parseInt(channelStats.subscriberCount || 0)
        };
      });

      videos = videos.concat(pageVideos);
      nextPageToken = videosData.nextPageToken;

    } while (nextPageToken && videos.length < 200); // Límite de 200 videos

    // Ordenar por fecha de publicación (más recientes primero)
    videos.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    res.status(200).json(videos);

  } catch (err) {
    console.error("Error cargando prédicas:", err);
    res.status(500).json({ error: "Error cargando prédicas", details: err.message });
  }
}

// Función para parsear duración ISO 8601
function parseDuration(duration) {
  if (!duration) return 0;
  
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  
  return hours * 3600 + minutes * 60 + seconds;
}

// Función para formatear duración
function formatDuration(seconds) {
  if (!seconds) return "0 min";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  return `${minutes} min`;
}