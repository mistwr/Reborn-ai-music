import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dir = path.join(process.cwd(), 'public');
  const files = fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith('.mp3'))
    .sort();
  
  const tracks = files.map(f => ({
    file: f,
    title: f
      .replace(/\.mp3$/i, '')
      .replace(/[_-]+/g, ' ')
      .replace(/\s*\(\d+\)\s*$/, '')
      .replace(/\s*__\d+_\s*$/, '')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase())
  }));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ tracks });
}
