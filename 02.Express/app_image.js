const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty')
const view = require('./view/index_image');
const template = require('./view/template_image');
const util = require('util');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/fileWebImage'));
app.use(multipart({ uploadDir: __dirname + '/public/fileWebImage' }))


app.get('/', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let content = template.HOME_CONTENTS;
        content = content.replace(/\n/g, "<br>")
        let control = template.buttonGen();
        let html = view.index('Web', list, content, control, true);
        res.send(html);
    });
});

app.get('/id/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let title = req.params.id;
        let control = template.buttonGen(title);
        let filename = 'data/' + title + '.txt'
        fs.readFile(filename, 'utf8', (error, buffer) => {
            buffer = buffer.replace(/\n/g, "<br >")
            let html = view.index(title, list, buffer, control, true);
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let control = template.buttonGen();
        let content = template.createForm();
        let html = view.index('글 생성', list, content, control, false);
        res.send(html);
    });
});

app.post('/create', (req, res) => {
    let subject = req.body.subject;
    let description = req.body.description;
    let filepath = 'data/' + subject + '.txt';
    fs.writeFile(filepath, description, error => {
        //이미지처리
        let imageName = subject + '.jpg';
        let uploadPath = req.files.image.path;
        let newFileName = __dirname + '/public/fileWebImage/' + imageName;

        fs.rename(uploadPath, newFileName, err => {
            res.status(302).redirect(`/id/${subject}`);
        });
    });
});


app.get('/delete/id/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let subject = req.params.id;
        let list = template.listGen(filelist);
        let control = template.buttonGen();
        let content = template.deleteForm(subject);
        let html = view.index('글 삭제', list, content, control, false);
        res.send(html);
    });
});

app.post('/delete', (req, res) => {
    let subject = req.body.subject;
    let filepath = 'data/' + subject + '.txt';
    let imagepath = 'public/fileWebImage/' + subject + '.jpg'
    fs.unlink(filepath, error => {
        fs.unlink(imagepath, error => {
            res.redirect('/');
        })
    });
});

app.get('/update/id/:id', (req, res) => {
    fs.readdir('data', function (error, filelist) {
        let list = template.listGen(filelist);
        let title = req.params.id;
        let control = template.buttonGen();
        let filename = 'data/' + title + '.txt'
        fs.readFile(filename, 'utf8', (error, buffer) => {
            let content = template.updateForm(title, buffer);
            let html = view.index(title, list, content, control, true);
            res.send(html);
        });
    });
});

app.post('/update', (req, res) => {
    let subject = req.body.subject;
    let description = req.body.description;
    let original = req.body.original;
    let filePath = 'data/' + original + '.txt';
    let imagePath = 'public/fileWebImage/'+ original + '.jpg';
    fs.writeFile(filePath, description, error => {
        if (original !== subject) {
            fs.renameSync(filePath, `data/${subject}.txt`);
            fs.renameSync(imagePath,`public/fileWebImage/${subject}.jpg`)
        };
        // 이미지처리
        let uploadType = req.files.image.type;
        let uploadPath = req.files.image.path;
        if (uploadType.indexOf('image') >= 0){
            let imageName = subject + '.jpg';
            let newFileName = __dirname + '/public/fileWebImage/' + imageName;
            fs.rename(uploadPath, newFileName, err => {
                res.status(302).redirect(`/id/${subject}`);
            });
        } else { // 이미지가 안 바뀐 경우 업로드 되는 파일 삭제
            fs.unlink(uploadPath, error => {
                res.status(302).redirect(`/id/${subject}`);
            });
        }
    });
});


app.get('*', (req, res) => {
    res.status(404).send('Path not found');
});


app.listen(3000, () => {
    util.log(`Server is runnuning at http:// 127.0.0.1:3000`);
});