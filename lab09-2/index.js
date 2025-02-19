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

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});
app.get('/signin', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/signin.html"));
});
app.get('/process_check', function (req, res) {
    let formsign = {
        username: req.query.username,
        email: req.query.email,
        password: req.query.password
    };
    console.log(formsign);
    const queryField = formsign.username ? 'username' : 'email';
    const queryValue = formsign.username || formsign.email;

    let sql = `SELECT * FROM users WHERE ${queryField} = '${queryValue}'`;
    conn.query(sql, function (err, result) {
        if (err) throw err;

        if (result.length === 0) {
            return res.send("ไม่พบบัญชีผู้ใช้");
        }
        const user = result[0];
        if (formsign.password === user.password) {
            return res.send("เข้าสู่ระบบสำเร็จ");
        } else {
            return res.send("รหัสผ่านไม่ถูกต้อง");
        }
    });
});
// สร้าง routing เมื่อ submit ข้อมูลในฟอร์ม
app.get('/process_get', function (req, res) {
    let formdata = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        age: req.query.age,
        address: req.query.address,
        phone: req.query.phone
    };
    console.log(formdata);

    let sql = `INSERT INTO users (username, password, email, firstname, lastname, age, address, phone) 
               VALUES ('${formdata.username}', '${formdata.password}', '${formdata.email}', 
                       '${formdata.firstname}', '${formdata.lastname}', ${formdata.age}, 
                       '${formdata.address}', '${formdata.phone}')`;
    console.log(sql);

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("A record inserted");
    });
});


app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 