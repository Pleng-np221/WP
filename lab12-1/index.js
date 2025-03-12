const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 3000;
const app = express();

const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
let db = new sqlite3.Database('customers.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

// Middleware setup
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    const query = 'SELECT * FROM customers ORDER BY RANDOM() LIMIT 1';
    db.get(query, (err, row) => {
        if (err) {
            console.log(err.message);
        }
        res.render('main', { data: row });
    });
});

app.post("/save", express.urlencoded({ extended: true }), (req, res) => {
    let { CustomerId, FirstName, LastName, Address, Email, Phone } = req.body;
    req.session.info = {
        CustomerId,
        FirstName,
        LastName,
        Address,
        Email,
        Phone
    };

    console.log("save:", req.session.info);

    res.json({ success: true, message: "บันทึกลง session สำเร็จ" });
});

app.get("/show", (req, res) => {
    if (req.session.info) {
        res.json({ success: true, data: req.session.info });
    } else {
        res.json({ success: false, message: "show failed" });
    }
});

app.post("/clear", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.json({ success: false, message: "clear failed" });
        }
        res.json({ success: true, message: "ลบข้อมูลใน session สำเร็จ" });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
