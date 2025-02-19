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
// Set EJS as templating engine
app.set('view engine', 'ejs');

// routing 
app.get('/create', function (req, res) {
    // create table 
    let sql ="SELECT * FROM instructor2";    
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Created table successfully.");
    }); 
    // insert data into table 
})

app.get('/show', function (req, res) {

    // ให้แสดงข้อมูล จาก table instructor และ teaches
    // ดังนี้ ID name dept_name course_id semester year

    const sql = 'select * from instructor';
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('show', { data: result })
        res.end()
    })
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

// สร้าง routing เมื่อ submit ข้อมูลในฟอร์ม
app.get('/process_get', function (req, res) {
    let formdata = {
        ID: req.query.ID,
        name: req.query.name,
        dept_name: req.query.dept_name,
        salary: req.query.salary
    };
    console.log(formdata);  
    let sql = `INSERT INTO instructor2 (ID, name, dept_name, salary) VALUES ('${formdata.ID}', '${formdata.name}', '${formdata.dept_name}', '${formdata.salary}')`;
    console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("a record inserted");
    });
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 