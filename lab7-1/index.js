// const http = require('http') 
// const port = process.env.PORT || 3000 
// const fs = require('fs') 

// const server = http.createServer((req,res) => {
//     const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
//     switch(path) {
//       case '':
//         serveStaticFile(res, '/public/home.html', 'text/html')
//         break
//       case '/about':
//         serveStaticFile(res, '/public/about.html', 'text/html')
//         break
//       case '/img/panda-logo.png':
//         serveStaticFile(res, '/public/img/panda-logo.png', 'image/png')
//         break
//       default:
//         serveStaticFile(res, '/public/404.html', 'text/html', 404)
//         break
//     }
//   })

// function serveStaticFile(res, path, contentType,
//     responseCode = 200) {
//     fs.readFile(__dirname + path, (err, data) => {
//         if (err) {
//             res.writeHead(500, { 'Content-Type': 'text/plain' })
//             return res.end('500 - Internal Error')
//         }
//         res.writeHead(responseCode, {
//             'Content-Type':
//                 contentType
//         })
//         res.end(data)
//     })
// } 
   
// server.listen(port, () => console.log(`server started on 
// port ${port}; ` + 'press Ctrl-C to terminate....'))
const express = require('express')
const app = express()
const port = 3000
const path = require('path');

// create directory 'public'
app.use(express.static('public'));
app.use(express.static('images'));

// Without middleware
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/home.html'));
});
app.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/about.html'));
});
app.get('/ducks', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/ducks.html'));
});
app.get('/raccoons', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/raccoons.html'));
});
app.get('/owls', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/owls.html'));
});

app.get('/hello', function(req, res){
  res.send("Hello World!");
});

app.post('/hello', function(req, res){
  res.send("You just called the post method at '/hello'!\n");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})