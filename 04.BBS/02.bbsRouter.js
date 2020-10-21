const dm = require('./db/db-modules');
const am = require('./view/userAlertMsg');
const ut = require('./04.utill');
const express = require('express');
const { data } = require('jquery');
const { param } = require('./03.userRouter');

const bRouter = express.Router();
bRouter.get('/list/:page',ut.isLoggedIn, (req, res) => {
    let page = parseInt(req.params.page);
    req.session.currentPage = page;
    let offset = (page-1) * 10;
    
    dm.getBbsTotalCount(result => {
        let totalPage = Math.ceil(result.count / 10);
        let startPage = Math.floor((page-1)/10)*10 + 1;
        let endPage = Math.ceil(page/10)*10;
        endPage = (endPage > totalPage) ? totalPage : endPage;
        dm.getBbsLists(offset,rows => {
            const view = require('./view/bbsList');
            let html = view.bbsForm(rows, req.session.uid, req.session.uname,page,startPage,endPage,totalPage,`bbs`);
            res.send(html);
        });
    });
});
bRouter.post('/list', (req, res) => {
    let title = req.body.search
    dm.getBbsSearch(title, rows => {
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
                    let _mine = (req.session.uid === req.params.uid ? 1:0)
                    const view = require('./view/bbsView');
                    let html = view.viewForm(result, req.session.uid, req.session.uname,rows,_mine);
                    res.send(html);
                
            });
        })
    });
});
bRouter.post('/view/reply', (req, res) => {
    let bid = req.body.bid;
    let uname = req.session.uname;
    let comment = req.body.comment;
    console.log(req.body.uid);
    console.log(req.session.uid);
    let isMine = (req.session.uid===req.body.uid ? 1:0)
    let params = [bid,req.session.uid,uname,comment,isMine];
    let bids = [bid,bid]
    dm.regReply(params,() => {
        dm.replyCount(bids,()=>{
            res.redirect(`/bbs/view/bid/${bid}/uid/${req.body.uid}`);
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
        res.redirect(`/bbs/list/1`);
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
        res.redirect('/bbs/list/1')
    });
});
module.exports = bRouter;