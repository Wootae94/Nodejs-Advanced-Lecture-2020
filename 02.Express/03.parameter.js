
const express = require('express');
const util = require('util');

const app = express();

// localhost:3000/query?id=any
app.get('/query', function (req, res) {
    let id = req.query.id;
    res.send(`<h1>id - ${id}</h1>`);
});

// localhost:3000/rest/id/any
app.get('/rest/id/:id', function (req, res) {
    let id = req.params.id;
    res.send(`<h1>id - ${id}</h1>`);
});

// localhost:3000/rest2/any
app.get('/rest2/:id', function (req, res) {
    let id = req.params.id;
    res.send(`<h1>id - ${id}</h1>`);
});

app.get('*', (req, res) => {
    res.status(404).send('Path not found');
});


app.listen(3000, () => {
    util.log(`Server is runnuning at http:// 127.0.0.1:3000`);
});