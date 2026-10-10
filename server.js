const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// নমুনা গানের ডাটা (Sample Data)
const songs = [
  { id: 1, title: "Shape of You", artist: "Ed Sheeran", genre: "Pop" },
  { id: 2, title: "Blinding Lights", artist: "The Weeknd", genre: "Pop" },
  { id: 3, title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock" },
  { id: 4, title: "Hotel California", artist: "Eagles", genre: "Rock" },
  { id: 5, title: "Levitating", artist: "Dua Lipa", genre: "Pop" },
  { id: 6, title: "Stay", artist: "Kid Laroi & Justin Bieber", genre: "Pop" },
  { id: 7, title: "Smells Like Teen Spirit", artist: "Nirvana", genre: "Rock" },
  { id: 8, title: "Bad Guy", artist: "Billie Eilish", genre: "Pop" },
  { id: 9, title: "Perfect", artist: "Ed Sheeran", genre: "Pop" },
  { id: 10, title: "Believer", artist: "Imagine Dragons", genre: "Rock" }
];

// RESTful API Endpoint (with Pagination & Search/Filter)
app.get('/api/songs', (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 4;
  let search = req.query.search || "";
  let genre = req.query.genre || "";

  // Filter songs based on search query and genre
  let filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(search.toLowerCase()) || 
                          song.artist.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre ? song.genre.toLowerCase() === genre.toLowerCase() : true;
    return matchesSearch && matchesGenre;
  });

  // Calculate Pagination indexes
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedSongs = filteredSongs.slice(startIndex, endIndex);

  res.json({
    page: page,
    limit: limit,
    totalSongs: filteredSongs.length,
    totalPages: Math.ceil(filteredSongs.length / limit),
    data: paginatedSongs
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});