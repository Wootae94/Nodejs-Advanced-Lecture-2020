const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const dm = require('./db/userdb-module');
const am = require('./view/userAlertMsg');
const session = require('express-session');
const Filestore = require('session-file-store')(session);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',
    resave: false,
    saveUninitialized: true,
    store: new Filestore({ logfn: function () { } })
}));

app.get('/', (req, res) => {
    console.log(req.session.uid);
    if (!req.session.uid) {
        res.redirect('/login');
    } else {
        dm.getAllLists(rows => {
            const view = require('./view/sessionList');
            let html = view.mainForm(rows, req.session.uname);
            res.send(html);
        });
    }
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
                req.session.uid = uid;
                req.session.uname = result.uname;
                console.log('Login 성공');
                req.session.save(function(){
                    res.redirect('/');
                });
            } else {
                let html = am.alertMsg('Login 실패 : Password를 확인하세요.', '/login')
                res.send(html);
            };
        };
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

app.listen(3000, () => {
    console.log(`Server is runnuning at http:// 127.0.0.1:3000`);
});