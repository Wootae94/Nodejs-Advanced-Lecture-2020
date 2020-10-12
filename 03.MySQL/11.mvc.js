const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const dm = require('./db/db-module');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    /*  dm.getAllLists(rows => {
        const view = require('./view/list');
        let html = view.mainForm(rows);
        res.end(html);
    }); */
    dm.getJoinLists(rows => {
        const view = require('./view/join');
        let html = view.JoinForm(rows);
        res.end(html);
});
});

app.get('/insert', (req, res) => {
    const view = require('./view/insert');
    let html = view.insertForm();
    res.send(html);
});

app.post('/insert', (req, res) => {

    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let params = [title, lyrics]
    dm.insertSong(params, () => {
        res.redirect('/');
    })

});

app.get('/delete/:sid', (req,res)=>{
    let sid = parseInt(req.params.sid);
    dm.getSong(sid,result => {
        const view = require('./view/delete');
        let html = view.deleteForm(result);
        res.send(html);
    });
});

app.post('/delete', (req,res)=>{
    let sid = parseInt(req.body.sid);
    dm.deleteSong(sid,()=>{
        res.redirect('/');
    });
});



app.get('/update/:sid', (req,res)=>{
    let sid = parseInt(req.params.sid);
    dm.getSong(sid,result => {
        const view = require('./view/update');
        let html = view.updateForm(result);
        res.send(html);
    });
});

app.post('/update', (req,res)=>{
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let sid = parseInt(req.body.sid);
    let params = [title, lyrics, sid]
    dm.updateSong(params, ()=>{
        res.redirect('/');
    })
});

app.listen(3000, () => {
    console.log(`Server is runnuning at http:// 127.0.0.1:3000`);
});