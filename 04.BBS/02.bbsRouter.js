const dm = require('./db/db-modules');
const am = require('./view/userAlertMsg');
const ut = require('./04.utill');
const express = require('express');

const bRouter = express.Router();
bRouter.get('/list', (req, res) => {
    dm.getBbsLists(rows => {
        const view = require('./view/bbsList');
        let html = view.bbsForm(rows, req.session.uname);
        res.send(html);
    });
});
bRouter.get('/view/bid/:bid', (req, res) => {
    
    dm.post(req.params.bid , (result) => {
        const view = require('./view/post');
        let html = view.postForm(result, req.session.uname);
        res.send(html);
    });
    
});
bRouter.get('/create', (req, res) => {
    res.send('bbsRouter get register')

});
bRouter.post('/create', (req, res) => {


});
bRouter.get('/update', (req, res) => {
    res.send('bbsRouter get register')

});
bRouter.get('/delete', (req, res) => {
    res.send('bbsRouter get register')

});
module.exports = bRouter;