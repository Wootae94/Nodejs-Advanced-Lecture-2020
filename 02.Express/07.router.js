const express = require('express');
const util = require('util');
const shoppingRouter = require('./07.shopping');

const app = express();

app.use(express.static(__dirname + '/public'));
let customerRouter = express.Router();
app.use('/shopping', shoppingRouter);
app.use('/customer', customerRouter);

app.get('/', function (req, res) {
    res.send('<h1>Root Router</h1>');
});

customerRouter.get('/', function (req, res) {
    res.send('<h1>Customer Router</h1>');
});
customerRouter.get('/index', function (req, res) {
    res.send('<h1>Customer Router Index</h1>');
});
app.get('*', (req, res) => {
    res.status(404).send('Path not found');
});


app.listen(3000, () => {
    util.log(`Server is runnuning at http:// 127.0.0.1:3000`);
});