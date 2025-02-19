// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// เพิ่มใช้งานไฟล์
conn = require('./dbconn.js');

// static resourse & template engine
// static resourse
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
// Set EJS as templating engine
app.set('view engine', 'ejs');

// routing 
app.get('/', (req, res) => {
  const sqlsongs = 'SELECT * FROM songs';
  const sqlartists = 'SELECT * FROM artists';

  conn.query(sqlsongs, (err, songs) => {
      if (err) throw err;

      conn.query(sqlartists, (err, artists) => {
          if (err) throw err;

          // Create a map for artist lookup
          const artistMap = {};
          artists.forEach(artist => {
              artistMap[artist.artist_id] = artist;
          });

          res.render('show', { data: songs, artists: artistMap });
      });
  });
});



app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 