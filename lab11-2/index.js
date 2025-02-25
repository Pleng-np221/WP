const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('todos.db', (err) => {    
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

//show data
app.get('/', (req, res) => {
  const query = 'SELECT * FROM todos';
  db.all(query, (err, rows) => {
      if (err) {
          console.log(err.message);
      }
      console.log(rows);
      res.render('show', { data : rows });     
  });
});

app.get('/create', async function (req, res) {
  const endpoint = "https://bored.api.lewagon.com/api/activity/";

    try {
        const response = await fetch(endpoint);
        // if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        console.log(data);

        res.render('create', { data });
    } catch (error) {
        console.error("Error :", error);
    }
});


//add new todo
app.post("/", (req, res) => {
  let { title, description, deadline } = req.body;
  let sql = `INSERT INTO todos (title, descript, deadline, completed) VALUES (?, ?, ?, 0)`;

  db.run(sql, [title, description, deadline], function (err) {
    if (err) throw err;
    console.log("todo added");
  });
});

app.get("/todos/:id", (req, res) => {
  const query = `SELECT * FROM todos WHERE id='${req.params.id}'; `;
  db.all(query, (err, rows) => {
      if (err) {
          console.log(err.message);
      }
      console.log(rows);
      res.render('todo', { data : rows[0] });     
  });
});
//edit in each todo
app.put("/todos/:id", (req, res) => {
  let { id } = req.params;
  let { title, descript, deadline, completed } = req.body;
  db.run(
    "UPDATE todos SET title = ?, descript = ?, deadline = ?, completed = ? WHERE id = ?",
    [title, descript, deadline, completed, id],
    function (err) {
      if (err) throw err;
      if (this.changes === 0) return res.status(404).json({ message: "Todo not found" });
      console.log("todo updated");
    }
  );
});
app.put("/checked/:id", (req, res) => {
  let { id } = req.params;
  let { completed } = req.body;
  db.run(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [completed, id],
    function (err) {
      if (err) throw err;
      if (this.changes === 0) return res.status(404).json({ message: "Todo not found" });
      console.log("todo updated");
    }
  );
});
//delete
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) throw err;
    if (this.changes === 0) return res.status(404).json({ message: "Todo not found" });
    console.log("todo deleted");
  });
});
// app.post('/todos/:id', (req, res) => {
//   // req.params.id
//   const query = `SELECT * FROM todos WHERE EmployeeID='${req.params.id}'; `;
//   db.all(query, (err, rows) => {
//       if (err) {
//           console.log(err.message);
//       }
//       console.log(rows);
//       res.send(JSON.stringify(rows));       
//   });
// });

// app.put('/todos/:id', (req, res) => {
//   // req.params.id
//   const query = `SELECT * FROM todos WHERE EmployeeID='${req.params.id}'; `;
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
  const endpoint = 'http://localhost:3000/todos/8';    
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