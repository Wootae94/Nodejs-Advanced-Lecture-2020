const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const Filestore = require('session-file-store')(session);
const favicon = require('express-favicon');
const bRouter = require('./02.bbsRouter');
const uRouter = require('./03.userRouter');
const { data } = require('jquery');
const app = express();
const dm = require('./db/db-modules');
const am = require('./view/userAlertMsg');
const ut = require('./04.utill');

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@poperjs/core/dist/umd'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/ckeditor4', express.static(__dirname + '/node_modules/ckeditor4/'));
app.use('/Chart.js', express.static(__dirname + '/node_modules/Chart.js/'));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',
    resave: false,
    saveUninitialized: true,
    store: new Filestore({ logfn: function () { } })
}));
app.use('/user', uRouter);
app.use('/bbs', bRouter);

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', ut.isLoggedIn, (req, res) => {
    res.redirect('/bbs/list/1')
});

app.get('/login', (req, res) => {
    const view = require('./view/login');
    let html = view.loginForm();
    res.send(html);
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = ut.generateHash(pwd);
    dm.getUserInfo(uid, result => {
        if (result === undefined) {
            let html = am.alertMsg(`Login 실패 : ID가 없습니다.`, '/login')
            res.send(html);
        } else {
            if (result.pwd === pwdHash) {
                req.session.uid = uid;
                req.session.uname = result.uname;
                console.log('Login 성공');
                req.session.save(function () {
                    res.redirect('/home');
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
    res.redirect('/home');
});
app.listen(3004, () => {
    console.log(`Server is runnuning at http:// 127.0.0.1:3004`);
});