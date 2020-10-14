const express = require('express');

const bRouter = express.Router();
bRouter.get('/create', (req, res) => {
    res.send('bbsRouter get register')

});
bRouter.post('/create', (req, res) => {


});
bRouter.get('/list', (req, res) => {
    res.send('bbsRouter get register')

});
bRouter.get('/view', (req, res) => {
    res.send('bbsRouter get register')

});
bRouter.get('/update', (req, res) => {
    res.send('bbsRouter get register')

});
bRouter.get('/delete', (req, res) => {
    res.send('bbsRouter get register')

});
module.exports = bRouter;