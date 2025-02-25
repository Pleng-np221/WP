const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('../lab11-2/node_modules/sqlite3/lib/sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('employees.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello! REST API");
});

app.get('/employees', (req, res) => {
  const query = 'SELECT * FROM employees ';
  db.all(query, (err, rows) => {
      if (err) {
          console.log(err.message);
      }
      console.log(rows);
      res.send(JSON.stringify(rows));        
  });
});

app.get('/employees/:id', (req, res) => {
  // req.params.id
  const query = `SELECT * FROM employees WHERE EmployeeID='${req.params.id}'; `;
  db.all(query, (err, rows) => {
      if (err) {
          console.log(err.message);
      }
      console.log(rows);
      res.send(JSON.stringify(rows));       
  });
});

// app.post('/employees/:id', (req, res) => {
//   // req.params.id
//   const query = `SELECT * FROM employees WHERE EmployeeID='${req.params.id}'; `;
//   db.all(query, (err, rows) => {
//       if (err) {
//           console.log(err.message);
//       }
//       console.log(rows);
//       res.send(JSON.stringify(rows));       
//   });
// });

// app.put('/employees/:id', (req, res) => {
//   // req.params.id
//   const query = `SELECT * FROM employees WHERE EmployeeID='${req.params.id}'; `;
//   db.all(query, (err, rows) => {
//       if (err) {
//           console.log(err.message);
//       }
//       console.log(rows);
//       res.send(JSON.stringify(rows));       
//   });
// });

//3rd in diagram thingy
app.get("/show", (req, res) => {
  const endpoint = 'http://localhost:3000/employees/8';    
  fetch(endpoint)
      .then(response => response.json())
      .then(empl => {
          console.log(empl);
          res.render('show', { data: empl });            
      })
      .catch(error => {
          console.log(error);
      });
});

app.get("/weather", (req, res) => {
  // city=ชื่อเมือง country=ตัวย่อประเทศ 
  const endpoint = 'http://10.0.15.21:8000/weather/rayong/th';    
  fetch(endpoint)
      .then(response => response.json())
      .then(airq => {
          console.log(airq);
          res.render('weather', { dat: airq });
                      
      })
      .catch(error => {
          console.log(error);
      });
});

app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});