///로그인창
const template = require('./template');

module.exports.updateForm = function (result, uid, uname) {

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
            
            <form action="/bbs/update/bid" method="POST">
            <input type="hidden" name="bid" id="bid" value="${result.bid}">
            <input type="hidden" name="uid" id="uid" value="${result.uid}">
                <table class="table table-borderless">
                    <tr>
                    <div class="form-group">
                    <td><label for="title">제목</label></td>
                    <td><input type="text" class="title" value="${result.title}" id="title" name="title"></td>
                    </div>
                    <div class="clearfix">
                    <td><span class="float-right">작성자: <strong>${result.uname}</strong></span></td>
                    </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <td ><label for="content">내용</label></td>
                            <td colspan="2"><textarea class="form-control" rows="7" id="content" name="content" >${result.content}</textarea></td>
                        </div>
                    </tr>
                    <tr>
                    <td colspan="3" style="text-align: right;">
                    <button type="submit" class="btn btn-warning btn-sm">수정</button>
                    <button onclick="location.href='/bbs/bid/${result.bid}/uid/${result.uid}'" class="btn btn-secondary btn-sm">취소</button>
                    </td>
                    </tr>
                    </table>
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