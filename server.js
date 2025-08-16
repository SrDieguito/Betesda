// server.js
const express = require('express');
const ytdl = require('yt-dlp-wrap').default;
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/download', async (req, res) => {
    const videoId = req.query.videoId;
    if (!videoId) return res.status(400).send('videoId es requerido');

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const outputPath = path.resolve(__dirname, `${videoId}.mp4`);

    const ytdlp = new ytdl();

    try {
        await ytdlp.execPromise([videoUrl, '-f', 'best', '-o', outputPath]);
        res.download(outputPath, `${videoId}.mp4`, (err) => {
            if (err) console.error(err);
            fs.unlinkSync(outputPath); // Borra el archivo después de la descarga
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al descargar el video');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
