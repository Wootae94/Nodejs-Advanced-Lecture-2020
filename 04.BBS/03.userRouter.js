
const express = require('express');
const dm = require('./db/db-modules');
const am = require('./view/userAlertMsg');
const ut = require('./04.utill');
const uRouter = express.Router();
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        // set a localstorage destination
        destination: __dirname + '/public/upload/',
        // set a file name
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString().replace(/[-:\.A-Z]/g, '') + '_' + file.originalname);
        }
    })
});

module.exports = uRouter;
/// 회원가입
uRouter.get('/register', (req, res) => {
    const view = require('./view/userReg');
    let html = view.registerForm();
    res.send(html);
});
uRouter.post('/register',upload.single('photo'), (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    let photo = req.file ? `/upload/${req.file.filename}` : '/upload/blank.png';
            if (pwd === pwd2) {
                let pwdHash = ut.generateHash(pwd);
                let params = [uid, pwdHash, uname, tel, email, photo];
                dm.userRegister(params, () => {
                    res.redirect(`/login`);
                });
            } else {
                let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/register`)
                res.send(html);
            }
        });
/// 관리자권한
uRouter.get('/uid/admin/list/:page', (req, res) => {
    if (req.params.page === 'null') {   // 없는 사진 처리
        res.status(200).send();
    } else {
        let page = parseInt(req.params.page);
        let offset = (page - 1) * 10;
        console.log(offset);
        dm.getUsersTotalCount(result => {
            let totalPage = Math.ceil(result.count / 10);
            let startPage = Math.floor((page-1)/10)*10 + 1;
            let endPage = Math.ceil(page/10)*10;
            endPage = (endPage > totalPage) ? totalPage : endPage;
            dm.getAllLists(offset, rows => {
                const view = require('./view/adminList');
                let html = view.listForm(rows, page, startPage, endPage, totalPage,`user/uid/admin`,'admin/list/1','관리자');
                res.send(html);
            });
        });

    }
});

/// 개인정보관리
uRouter.get('/uid/:uid', (req, res) => {
    let uid = req.params.uid
    if (uid === 'admin') {
        res.redirect('/user/uid/admin/list/1')
    } else {
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/useDetail')
            let html = view.userDetail(result, req.session.uid, req.session.uname);
            res.send(html);
        });
    }


});
uRouter.get('/update/uid/:uid',ut.hasRight, (req, res) => {
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/userUpdate')
            let html = view.updateForm(result, req.session.uid, req.session.uname);
            res.send(html);
        })
   
});
uRouter.post('/update/uid',upload.single('photo'), (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    let photo = req.file ? '/upload/' + req.file.filename : null;
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [pwdHash, uname, tel, email]
        dm.updateUser(params,photo,uid, () => {
            res.redirect(`/user/uid/${uid}`);
        });
    } else {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/update/uid/${uid}`)
        res.send(html);
    }
});

uRouter.get('/delete/uid/:uid',ut.hasRight, (req, res) => {
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/userDelete')
            let html = view.deleteForm(result, req.session.uid, req.session.uname);
            res.send(html);
        })
});
uRouter.post('/delete/uid', (req, res) => {
    dm.deleteUser(req.body.uid, () => {
        req.session.destroy();
        res.redirect('/home');
    })
});