import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // No Vercel, process.cwd() é a raiz do projeto
  // Os MP3 estão em /public/ ao lado de /api/
  const dir = path.join(process.cwd(), 'public');

  let files = [];
  try {
    files = fs.readdirSync(dir)
      .filter(f => f.toLowerCase().endsWith('.mp3'))
      .sort();
  } catch (e) {
    return res.status(500).json({ error: 'Cannot read directory', detail: e.message });
  }

  const tracks = files.map(f => ({
    file: '/' + f,   // URL pública: /NomeFicheiro.mp3
    title: f
      .replace(/\.mp3$/i, '')
      .replace(/[_]+/g, ' ')
      .replace(/\(\d+\)/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase())
  }));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ tracks, count: tracks.length });
}
