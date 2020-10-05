const util = require('util');
const bodyParser = require('body-parser')
const express = require('express');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req,res) => {
    //res.send(`<h1>3초후 로그인페이지로 이동합니다.</h1>`)
    
    setTimeout(()=>{
        res.redirect('/login');
    },3000) 
}); 

app.get('/login', (req,res) => {
    fs.readFile('09.loginform.html','utf8',(error,data) => {
        res.send(data);
    });
});

app.post('/login', (req,res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    console.log(req.body);
    console.log(`uid: ${uid}, pwd: ${pwd}`);
    if (uid === 'park' && pwd === '1234'){
        res.send(`<h1>Login Success</h1>`);
    }else
        res.redirect('/login');
});

app.listen(3000, () => {
    util.log(`Server is runnuning at http:// 127.0.0.1:3000`);
});