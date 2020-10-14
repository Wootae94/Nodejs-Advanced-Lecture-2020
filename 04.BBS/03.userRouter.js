
const express = require('express');
const dm = require('./db/userdb');
const am = require('./view/userAlertMsg');
const ut = require('./04.utill');
const uRouter = express.Router();

uRouter.get('/register', (req, res) => {
    const view = require('./view/userRegister');
    let html = view.registerForm();
    res.send(html);
});
uRouter.post('/register', (req, res) => {
    let uname = req.body.uname
    let uid = req.body.uid
    let pwd = req.body.pwd
    let pwd2 = req.body.pwd2
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [uname, uid, pwdHash];
        dm.userRegister(params, () => {
            res.redirect(`/user/register/detail/${uid}`);
        });
    } else {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/register`)
        res.send(html);
    }

});
uRouter.get('/register/detail/:uid', (req, res) => {
    dm.getUserInfo(req.params.uid, (result) => {
        const view = require('./view/userDetail')
        let html = view.userDetail(result);
        
        console.log(result.uid);
        res.send(html);
    });
});
uRouter.post('/register/detail', (req, res) => {
    let tel = req.body.tel
    let email = req.body.email
    let uid = req.body.uid
    let params = [tel, email, uid]
    dm.userDetail(params, () => {
        res.redirect('/login')
    });

});
/// 회원가입

uRouter.get('/list', (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/userList');
        let html = view.listForm(rows);
        res.send(html);
    });
});
uRouter.get('/update', (req, res) => {
    res.send('userRouter get register')

});
uRouter.get('/delete', (req, res) => {
    res.send('userRouter get register')

});
module.exports = uRouter;