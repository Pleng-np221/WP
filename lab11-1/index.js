const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('../lab11-2/node_modules/sqlite3/lib/sqlite3').verbose();

// Creating the Express server
const app = express();


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
  const endpoint = 'http://10.0.15.21:8000/countries';    
  fetch(endpoint)
      .then(response => response.json())
      .then(ctr => {
          console.log(ctr);
          res.render('show', { dat: ctr });
                      
      })
      .catch(error => {
          console.log(error);
      });
});

app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});