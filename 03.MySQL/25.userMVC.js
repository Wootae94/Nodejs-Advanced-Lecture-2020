const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const dm = require('./db/userdb-module');
const am = require('./view/userAlertMsg');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/userList');
        let html = view.mainForm(rows);
        res.send(html);
    });
});
app.get('/login', (req, res) => {
    const view = require('./view/userLogin');
    let html = view.loginForm();
    res.send(html);
});
app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = dm.generateHash(pwd);
    dm.getUserInfo(uid, result => {
        if (result === undefined) {
            let html = am.alertMsg(`Login 실패 : uid ${uid} 이/가 없습니다.`, '/login')
            res.send(html);
        } else {
            if (result.pwd === pwdHash) {
                console.log('Login 성공');
                res.redirect('/');
            } else {
                let html = am.alertMsg('Login 실패 : Password를 확인하세요.', '/login')
                res.send(html);
            };
        };
    });
});


app.listen(3000, () => {
    console.log(`Server is runnuning at http:// 127.0.0.1:3000`);
});