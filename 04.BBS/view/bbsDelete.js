const template = require('./template');
module.exports.deleteForm = function (result, uid, uname) {
    return `
    ${template.header()}
    ${template.navbarUser(uid, uname)}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
    <h3>게시물 삭제</h3>
    <hr>
    <form action="/bbs/delete/bid" method="POST">
        <input type="hidden" name="bid" value="${result.bid}">
        <table class="table table-borderless">
            <tr>
                <td>
                ${result.title} 을/를 삭제하시겠습니까?
                </td>
            </tr>
            <tr>
                <td >
                <button type="submit" class="btn btn-danger btn-sm">삭제</button>
                <button onclick="location.href='/bbs/list'" type="reset" class="btn btn-secondary btn-sm">취소</button>
                </td>
            </tr>
            </table>
    </form>
    </div>
    <div class="col-2"></div>
    </div>
    </div>
    ${template.footer()}
    </body>
</html>
    `
};