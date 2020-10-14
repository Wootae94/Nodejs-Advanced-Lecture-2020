const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const Filestore = require('session-file-store')(session);
const bRouter = require('./02.bbsRouter');
const uRouter = require('./03.userRouter');
const fs = require('fs');
const { data } = require('jquery');
const app = express();
app.use('/bootstrap',express.static(__dirname+'/node_modules/bootstrap/dist'));
app.use('/popper',express.static(__dirname+'/node_modules/@poperjs/core/dist/umd'));
app.use('/jquery',express.static(__dirname+'/node_modules/jquery/dist/'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',
    resave: false,
    saveUninitialized: true,
    store: new Filestore({ logfn: function () { } })
}));
app.use('/user', uRouter);
app.use('/bbs', bRouter);

app.get('/',(req,res)=>{
   
    res.redirect('/home');
});

app.get('/home',(req,res)=>{
    const view = require('./view/home');
    let html = view.home();
    res.send(html);
});

app.get('/login',(req,res)=>{
    const view = require('./view/login');
    let html = view.loginForm();
    res.send(html); 
});

app.post('/login',(req,res)=>{

});

app.get('/logout',(req,res)=>{

});

app.listen(3000, () => {
    console.log(`Server is runnuning at http:// 127.0.0.1:3000`);
});