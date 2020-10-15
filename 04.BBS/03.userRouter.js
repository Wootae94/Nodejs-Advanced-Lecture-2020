
const express = require('express');
const dm = require('./db/db-modules');
const am = require('./view/userAlertMsg');
const ut = require('./04.utill');
const uRouter = express.Router();


module.exports = uRouter;
/// 회원가입
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
/// 회원리스트
uRouter.get('/admin/list', (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/userList');
        let html = view.listForm(rows);
        res.send(html);
    });
});
/// 관리자권한
uRouter.get('/admin/update/:uid', (req, res) => {
    let uid = req.params.uid;
    dm.getUserInfo(uid,result => {
        const view = require('./view/adminUpdate');
        let html = view.updateForm(result);
        res.send(html);
    });
});
uRouter.post('/admin/update', (req,res)=>{
    let uname = req.body.uname
    let uid = req.body.uid
    let pwd = req.body.pwd
    let pwd2 = req.body.pwd2
    let tel = req.body.tel
    let email = req.body.email
    if (pwd === pwd2){
        let pwdHash = ut.generateHash(pwd);
        let params = [uid,pwdHash,uname,tel,email];
        dm.updateUser(params,()=>{
            res.redirect('/user/admin/list');
        });
    } else {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/admin/update/${uid}`)
        res.send(html);
    }
});

uRouter.get('/admin/delete/:uid', (req, res) => {
    let uid = req.params.uid;
    dm.getUserInfo(uid,result => {
        const view = require('./view/adminDelete');
        let html = view.deleteForm(result);
        res.send(html);
    });
});
uRouter.post('/admin/delete', (req,res)=>{
    dm.deleteUser(req.body.uid,()=>{
        res.redirect('/user/admin/list')
    } )
});
/// 개인정보관리
uRouter.get('/update', (req, res) => {
    res.send('userRouter get register')

});
uRouter.get('/delete', (req, res) => {
    res.send('userRouter get register')

});