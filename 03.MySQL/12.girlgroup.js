const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const dm2 = require('./db/db-module2');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
     dm2.getAllLists(rows => {
        const view = require('./view/list2');
        let html = view.mainForm(rows);
        res.end(html);
    });
   /*  dm2.getJoinLists(rows => {
        const view = require('./view/join2');
        let html = view.JoinForm(rows);
        res.end(html);
});  */
});

app.get('/insert', (req, res) => {
    const view = require('./view/insert2');
    let html = view.insertForm();
    res.send(html);
});

app.post('/insert', (req, res) => {

    let NAME = req.body.NAME;
    let debut = req.body.debut;
    let params = [NAME, debut]
    dm2.insertGroup(params, () => {
        res.redirect('/');
    })

});

app.get('/delete/:ggid', (req,res)=>{
    let ggid = parseInt(req.params.ggid);
    dm2.getGroup(ggid,result => {
        const view = require('./view/delete2');
        let html = view.deleteForm(result);
        res.send(html);
    });
});

app.post('/delete', (req,res)=>{
    let ggid = parseInt(req.body.ggid);
    dm2.deleteGroup(ggid,()=>{
        res.redirect('/');
    });
});

app.get('/update/:ggid', (req,res)=>{
    let ggid = parseInt(req.params.ggid);
    dm2.getGroup(ggid,result => {
        const view = require('./view/update2');
        let html = view.updateForm(result);
        res.send(html);
    });
});

app.post('/update', (req,res)=>{
    let NAME = req.body.NAME;
    let debut = req.body.debut;
    let ggid = parseInt(req.body.ggid);
    let params = [NAME, debut, ggid]
    dm2.updateGroup(params, ()=>{
        res.redirect('/');
    })
});

app.listen(3000, () => {
    console.log(`Server is runnuning at http:// 127.0.0.1:3000`);
});