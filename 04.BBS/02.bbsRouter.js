const dm = require('./db/db-modules');
const am = require('./view/userAlertMsg');
const ut = require('./04.utill');
const express = require('express');
const { data } = require('jquery');
const { param } = require('./03.userRouter');

const bRouter = express.Router();
bRouter.get('/list', (req, res) => {
    dm.getBbsLists(rows => {
        const view = require('./view/bbsList');
        let html = view.bbsForm(rows, req.session.uid, req.session.uname);
        res.send(html);
    });
});
bRouter.post('/list', (req, res) => {
    let uname = req.body.search
    dm.getBbsSearch(uname, rows => {
        const view = require('./view/bbsList');
        let html = view.bbsForm(rows, req.session.uid, req.session.uname);
        res.send(html);
    });
});

bRouter.get('/view/bid/:bid/uid/:uid', (req, res) => {
    let bid = req.params.bid
    dm.getBbsView(bid, (result) => {
        dm.incViewCount(bid, () => {
            dm.viewReply(bid,(rows) => {
                if (req.session.uid === req.params.uid) {
                    const view = require('./view/bbsViewMine');
                    let html = view.viewForm(result, req.session.uid, req.session.uname,rows);
                    res.send(html);
                } else {
                    const view = require('./view/bbsView');
                    let html = view.viewForm(result, req.session.uid, req.session.uname,rows);
                    res.send(html);
                }
            });
        })
    });
});
bRouter.post('/view/reply', (req, res) => {
    let bid = req.body.bid;
    let uname = req.session.uname;
    let comment = req.body.comment;
    let params = [bid,req.session.uid,uname,comment];
    let bids = [bid,bid]
    console.log(req.body.uid);
    dm.regReply(params,() => {
        dm.replyCount(bids,()=>{
            if(req.body.uid===req.session.uid){
                dm.replyIsMine([req.body.uid,bid],()=>{
                    res.redirect(`/bbs/view/bid/${bid}/uid/${req.body.uid}`)
                })
            } else {
                dm.replyNotMine([req.session.uid,bid],()=>{
                    res.redirect(`/bbs/view/bid/${bid}/uid/${req.body.uid}`)
                })
            }
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
        res.redirect(`/bbs/list`);
    });
});
bRouter.get('/update/bid/:bid', (req, res) => {
    dm.getBbsView(req.params.bid, (result) => {
        const view = require('./view/bbsUpdate');
        let html = view.updateForm(result, req.session.uid, req.session.uname);
        res.send(html);
    });
});
bRouter.post('/update/bid', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let bid = req.body.bid;
    let params = [title, content, bid];
    dm.updateBbs(params, () => {
        res.redirect(`/bbs/list`);
    });;
});
bRouter.get('/delete/bid/:bid', (req, res) => {
    dm.getBbsView(req.params.bid, (result) => {
        const view = require('./view/bbsDelete');
        let html = view.deleteForm(result, req.session.uid, req.session.uname);
        res.send(html);
    });

});
bRouter.post('/delete/bid', (req, res) => {
    dm.deleteBbs(req.body.bid, () => {
        res.redirect('/bbs/list')
    });
});
module.exports = bRouter;