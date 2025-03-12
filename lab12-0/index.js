const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 3000;
const app = express();

const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
let db = new sqlite3.Database('userInfo.db', (err) => {    
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

app.use(cookieParser());

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
};

// Routes
app.get("/", (req, res) => {
    res.send(`Sessions and Cookies Example <a href="/login">Click here</a> to log-in.`);
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.post("/login", express.urlencoded({ extended: true }), (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.all(query, [username, password], (err, rows) =>{
        console.log(rows)
        if (err) {
            console.log("❗" + err.message);
            return;
        }
        if (rows) {
            // Store user data in the session
            req.session.user = username;
            res.cookie("sessionId", req.sessionID);
    
            res.redirect("/profile");
        } else {
            res.send("Invalid credentials. Please try again.");
        }
    }
    );

});

app.get("/profile", isAuthenticated, (req, res) => {
    // Retrieve user data from the session
    const username = req.session.user;
    res.send(`Welcome, ${username} ! <a href="/logout">Logout</a>`);
});

app.get("/logout", (req, res) => {
    // Destroy the session and redirect to the login page
    req.session.destroy(() => {
        res.clearCookie("sessionId");
        res.redirect("/login");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
