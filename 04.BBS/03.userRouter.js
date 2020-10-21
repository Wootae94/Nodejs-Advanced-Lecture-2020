
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
            //cb(null, file.originalname);
            cb(null, new Date().toISOString().replace(/[-:\.A-Z]/g,'') + '_' + file.originalname);
        }
    })
});



module.exports = uRouter;
uRouter.use('/register/detail/', express.static('uploads'));
/// 회원가입
uRouter.get('/register', (req, res) => {
    const view = require('./view/userReg');
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
                let params = [uname, uid, pwdHash, uname, uid, pwdHash];
                dm.userRegister(params, () => {
                    res.redirect(`/user/register/detail/uid/${uid}`);
                });
            } else {
                let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/register`)
                res.send(html);
            }
        });
uRouter.get('/register/detail/uid/:uid', (req, res) => {
    dm.getUserInfo(req.params.uid, (result) => {
        const view = require('./view/userRegDetail')
        let html = view.userDetail(result);
        res.send(html);
    });
});
uRouter.post('/register/detail', (req, res) => {
    let tel = req.body.tel
    let email = req.body.email
    let uid = req.body.uid
    let params = [tel, email, uid]
    dm.userDetail(params, () => {
        res.redirect(`/user/register/detail/upload/uid/${uid}`)
    });
});
uRouter.get('/register/detail/upload/uid/:uid', (req, res) => {
    
        const view = require('./view/userUpload')
        let html = view.userUpload();
        res.send(html);
    
});

  uRouter.post('/register/detail/upload/uid', upload.single('userfile'), function(req, res){
    res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  });

/// 관리자권한
uRouter.get('/admin/list/:page', (req, res) => {
    let page = parseInt(req.params.page);
    req.session.currentPage = page;
    let offset = (page-1) * 10;

    dm.getUsersTotalCount(result => {
        let totalPage = Math.ceil(result.count / 10);
        let startPage = Math.floor((page-1)/10)*10 + 1;
        let endPage = Math.ceil(page/10)*10;
        endPage = (endPage > totalPage) ? totalPage : endPage;
        dm.getAllLists(offset, rows => {
            const view = require('./view/adminList');
            let html = view.listForm(rows, page, startPage, endPage, totalPage,`user/admin`);
            res.send(html);
        });
    });
});
uRouter.get('/admin/update/:uid', (req, res) => {
    let uid = req.params.uid;
    dm.getUserInfo(uid, result => {
        const view = require('./view/adminUpdate');
        let html = view.updateForm(result);
        res.send(html);
    });
});
uRouter.post('/admin/update', (req, res) => {
    let uname = req.body.uname
    let uid = req.body.uid
    let pwd = req.body.pwd
    let pwd2 = req.body.pwd2
    let tel = req.body.tel
    let email = req.body.email
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email,uid];
        dm.updateUser(params, () => {
            res.redirect('/user/admin/list/1');
        });
    } else {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/admin/update/${uid}`)
        res.send(html);
    }
});
uRouter.get('/admin/delete/:uid', (req, res) => {
    let uid = req.params.uid;
    dm.getUserInfo(uid, result => {
        const view = require('./view/adminDelete');
        let html = view.deleteForm(result);
        res.send(html);
    });
});
uRouter.post('/admin/delete', (req, res) => {
    dm.deleteUser(req.body.uid, () => {
        res.redirect('/user/admin/list/1')
    })
});
/// 개인정보관리
uRouter.get('/uid/:uid', (req, res) => {
    let uid = req.params.uid
    if (uid === 'admin') {
        res.redirect('/user/admin/list/1')
    } else {
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/useDetail')
            let html = view.userDetail(result, req.session.uid, req.session.uname);
            res.send(html);
        });
    }


});
uRouter.get('/update/uid/:uid', (req, res) => {
    if (req.params.uid === req.session.uid) {    // 권한이 있는 상태
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/userUpdate')
            let html = view.updateForm(result, req.session.uid, req.session.uname);
            res.send(html);
        })
    } else {
        let html = am.alertMsg('수정 권한이 없습니다.', '/')
        res.send(html);
    }
});
uRouter.post('/update/uid', (req, res) => {
    let uname = req.body.uname
    let uid = req.body.uid
    let pwd = req.body.pwd
    let pwd2 = req.body.pwd2
    let tel = req.body.tel
    let email = req.body.email
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email, req.session.uid];
        dm.updateUser(params, () => {
            res.redirect('/bbs/list/1');
        });
    } else {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/update/uid/${uid}`)
        res.send(html);
    }
});

uRouter.get('/delete/uid/:uid', (req, res) => {
    if (req.params.uid === req.session.uid) {    // 권한이 있는 상태
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/userDelete')
            let html = view.deleteForm(result, req.session.uid, req.session.uname);
            res.send(html);
        })
    } else {
        let html = am.alertMsg('수정 권한이 없습니다.', '/')
        res.send(html);
    }
});
uRouter.post('/delete/uid', (req, res) => {
    dm.deleteUser(req.body.uid, () => {
        req.session.destroy();
        res.redirect('/home');
    })
});