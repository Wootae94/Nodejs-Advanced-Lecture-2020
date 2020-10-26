///로그인창
const template = require('./template');

module.exports.writeForm = function (uid, uname) {

    return `
    
    <!DOCTYPE html>
<html lang="ko">
<head>
    <title>My BBS</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css"> 
    <link rel="stylesheet" href="/fontawesome-free-5.15.1-web/css/all.min.css">
    <script src="/jquery/jquery.min.js"></script>
    <script src="/popper/popper.min.js"></script>
    <script src="/bootstrap/js/bootstrap.min.js"></script>
    <script src="/ckeditor4/ckeditor.js"></script>

</head>
<body>
    ${template.navbarUser(uid, uname)}
    <div class="container" style="margin-top: 90px;">
    <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
            <form action="/bbs/write" method="POST">
                        <label for="title">제목</label></td>
                        <input type="text" class="title" placeholder="제목" id="title"name="title">
                        <span class="float-right">작성자: <strong>${uname}</strong></span>
                        <br><br>
                        <label for="content">내용</label>
                        <textarea class="form-control" rows="7" id="content" name="content"></textarea>
                        <br>
                        <div class="float-right"> <button type="submit" class="btn btn-primary btn-sm" >작성</button>
                        </div>
            </form>
        </div>
        <div class="col-1"></div>
        </div>
        </div>
        ${template.footer()}
    <script type="text/javascript">
    CKEDITOR.replace('content',{
        extraPlugins: 'uploadimage, image2',
        height: 300,
        filebrowserUploadUrl:'/bbs/uploadImage.do'}); 
    </script>
    </body>
</html>
    `
};