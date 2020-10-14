const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const dm = require('./db/userdb-module');
const am = require('./view/userAlertMsg');
const ut = require('./28.utill');
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


app.get('/', ut.isLoggedIn, (req, res) => {
        dm.getAllLists(rows => {
            const view = require('./view/rightList');
            let html = view.mainForm(rows, req.session.uname);
            res.send(html);
        });
});
app.get('/delete/:uid',ut.isLoggedIn,(req,res)=>{
        if (req.params.uid === req.session.uid){    // 권한이 있는 상태
            dm.deleteUser(req.params.uid,()=>{
                res.redirect('/')
            } )
        } else {
            let html = am.alertMsg('삭제 권한이 없습니다.', '/')
            res.send(html);
        }
});

app.get('/update/:uid',ut.isLoggedIn,(req,res)=>{
    if (req.params.uid === req.session.uid){    // 권한이 있는 상태
        dm.getUserInfo(req.params.uid,(result)=>{
            const view = require('./view/userUdate')
            let html = view.updateForm(result);
            res.send(html);
        } )
    } else {
        let html = am.alertMsg('수정 권한이 없습니다.', '/')
        res.send(html);
    }
});

app.post('/update',ut.isLoggedIn, (req,res)=>{
    let uid = req.body.uid
    let pwd = req.body.pwd
    let pwd2 = req.body.pwd2
    if (pwd === pwd2){
        let pwdHash = ut.generateHash(pwd);
        let params = [pwdHash,uid];
        dm.updateUser(params,()=>{
            res.redirect('/');
        });
    } else {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/update/${uid}`)
        res.send(html);
    }
})

app.get('/login', (req, res) => {
    const view = require('./view/userLogin');
    let html = view.loginForm();
    res.send(html);
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = ut.generateHash(pwd);
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