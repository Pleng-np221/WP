// const express = require('express');
// const cookieParser = require('cookie-parser');
// const app = express();
// const port = 3000;

// app.use(cookieParser());

// app.get('/', (req, res) => {
  
//   // parameters: req.cookies.cookie_name
//   let visits = parseInt(req.cookies.visits) || 0;
//   visits++;
//   // set your cookie name
//   res.cookie('visits', visits, { maxAge: 86400000 }); 
//   // Set cookie expiration 1000*60*60*24 (1 day)

//   // Clearing the cookie
//   res.clearCookie('visits'); 

//   res.send(`You visited this page ${visits} times.`);
  
// });

// app.listen(port, () => {
//     console.log(`Starting node.js at port ${port}`);
//   });

const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const http = require('http');
const PORT = 3000;
const app = express();

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
secret: "thisismysecretkey",
saveUninitialized:true,
cookie: { maxAge: oneDay },
resave: false
}));

app.use(cookieParser());

app.get('/', function(req, res){
    //page_views ตัวแปรกำหนดเองได้
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });
 
app.get('/set',function(req, res){
req.session.user = { name:'Johhn Doe' };
res.send('Session set ' + req.sessionID);
});

app.get('/get',function(req, res){
res.send(req.session.user);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});