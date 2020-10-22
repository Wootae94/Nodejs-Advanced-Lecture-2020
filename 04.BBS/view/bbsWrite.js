///로그인창
const template = require('./template');

module.exports.writeForm = function (uid, uname) {

    return `
    
    ${template.header()}
    ${template.navbarUser(uid, uname)}
    <div class="container" style="margin-top: 90px;">
    <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
            <form action="/bbs/write" method="POST">
                <table class="table table-borderless">
                    <tr>
                    <div class="form-group">
                    <td><label for="title">제목</label></td>
                    <td><input type="text" class="title" placeholder="제목" id="title"name="title"></td>
                    </div>
                    <div class="clearfix">
                    <td><span class="float-right">작성자: <strong>${uname}</strong></span></td>
                    </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <td ><label for="content">내용</label></td>
                            <td colspan="2"><textarea class="form-control" rows="7" id="content" name="content"></textarea></td>
                        </div>
                    </tr>
                    <tr>
                        <td>
                        <button type="submit" class="btn btn-primary btn-sm" >작성</button>
                        </td>
                    </tr>
                    </table>
            </form>
        </div>
        <div class="col-1"></div>
    </div>
</div>
    ${template.footer()}
    </body>
</html>
    `
};