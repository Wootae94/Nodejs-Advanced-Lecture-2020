const dm = require('./db/db-modules');
const ut = require('./04.utill');
const express = require('express');
const { data } = require('jquery');
const { param } = require('./03.userRouter');
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

const bRouter = express.Router();
bRouter.get('/list/:page', ut.isLoggedIn, (req, res) => {
    let page = parseInt(req.params.page);
    req.session.currentPage = page;
    let offset = (page - 1) * 10;

    dm.getBbsTotalCount(result => {
        let totalPage = Math.ceil(result.count / 10);
        let startPage = Math.floor((page - 1) / 10) * 10 + 1;
        let endPage = Math.ceil(page / 10) * 10;
        endPage = (endPage > totalPage) ? totalPage : endPage;
        dm.getBbsLists(offset, rows => {
            const view = require('./view/bbsList');
            let html = view.bbsForm(rows, req.session.uid, req.session.uname, page, startPage, endPage, totalPage, `bbs`);
            res.send(html);
        });
    });
});
bRouter.post('/search', (req, res) => {
    let keyword = req.body.search
    dm.getBbsSearch(keyword, rows => {
        const view = require('./view/bbsList');
        let html = view.bbsForm(rows, req.session.uid, req.session.uname);
        res.send(html);
    });
});

bRouter.get('/bid/:bid/uid/:uid', (req, res) => {
    let bid = req.params.bid
    let uid = req.params.uid
    dm.getBbsData(bid, (result) => {
        dm.viewReply(bid, (rows) => {
            dm.incViewCount(uid,req.session.uid,bid, () => {
                    let _mine = (req.session.uid === req.params.uid ? 1 : 0)
                    const view = require('./view/bbsView');
                    let html = view.viewForm(result, req.session.uid, req.session.uname, rows, _mine);
                    res.send(html);
            });
        })
    });
});
bRouter.post('/reply', (req, res) => {
    let bid = req.body.bid;
    let uname = req.session.uname;
    let comment = req.body.comment;
    let isMine = (req.session.uid === req.body.uid ? 1 : 0)
    let params = [bid, req.session.uid, uname, comment, isMine];
    let bids = [bid, bid]
    dm.regReply(params, () => {
        dm.replyCount(bids, () => {
            res.redirect(`/bbs/bid/${bid}/uid/${req.body.uid}`);
        })
    })
});
bRouter.get('/write', (req, res) => {
    const view = require('./view/bbsWrite');
    let html = view.writeForm(req.session.uid, req.session.uname);
    res.send(html);
});
bRouter.post('/write', (req, res) => {
    let uid = req.session.uid;
    let uname = req.session.uname;
    let title = req.body.title;
    let content = req.body.content;
    let params = [uid, uname, title, content];
    dm.regBbsWrite(params, () => {
        res.redirect(`/bbs/list/1`);
    });
});
bRouter.get('/update/bid/:bid', (req, res) => {
    let bid = req.params.bid
    dm.getBbsData(bid, (result) => {
        const view = require('./view/bbsUpdate');
        let html = view.updateForm(result, req.session.uid, req.session.uname);
        res.send(html);
    });
});
bRouter.post('/update/bid', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let bid = req.body.bid;
    let uid = req.body.uid;
    let params = [title, content, bid];
    dm.updateBbs(params, () => {
        res.redirect(`/bid/${bid}/uid/${uid}`);
    });;
});
bRouter.get('/delete/bid/:bid', (req, res) => {
    let bid = req.params.bid
    dm.getBbsData(bid, (result) => {
        const view = require('./view/bbsDelete');
        let html = view.deleteForm(result, req.session.uid, req.session.uname);
        res.send(html);
    });

});
bRouter.post('/delete/bid', (req, res) => {
    let bid = req.body.bid;
    dm.deleteBbs(bid, () => {
        res.redirect('/bbs/list/1')
    });
});
bRouter.post('/uploadImage.do', ut.isLoggedIn, upload.single('upload'), (req, res) => {
    //console.log(req.file);
    let fileUrl = '/upload/' + req.file.filename;
    let jsonResponse = {
        uploaded: 1,
        fileName: req.file.filename,
        url: fileUrl
    };
    res.send(JSON.stringify(jsonResponse));
});

module.exports = bRouter;