const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('employee.db', (err) => {    
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


app.get('/show', function (req, res) {
    const query = 'SELECT * FROM employees ';
    db.all(query, (err, rows) => {
      if (err) {
        console.log(err.message);
      }
      console.log(rows);
      res.render('show', { data : rows });
    });
  });

app.get('/home', function (req, res) {
    res.render('home');
});

app.get('/delete', function (req, res) {
        // Deleting Data
        //http://localhost:3000/delete?id=2
    let sql = `DELETE FROM employees WHERE EmployeeId=${req.query.id};`;
    console.log(sql);
    // delete a row based on id
    db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Row(s) deleted.`);
    });
});

app.get('/form', function (req, res) {
    // res.sendFile(path.join(__dirname, "/public/form.html"));
    res.render('form');
});

app.get('/process_get', function (req, res) {
    let sql = `INSERT INTO employees VALUES(${req.query.id},"${req.query.lname}","${req.query.fname}","${req.query.title}",${req.query.phone},"${req.query.email}");`;
    console.log(sql);
    
    db.run(sql, function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Row inserted`);
    });
});

// Starting the server
app.listen(port, () => {
   console.log("Server started.");
 });