const template = require('./template');
module.exports.deleteForm = function (result) {
    return `
    ${template.header()}
    ${template.navbarUser()}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
    <h3>회원 탈퇴</h3>
    <hr>
    <form action="/user/delete/uid" method="POST">
        <input type="hidden" name="uid" value="${result.uid}">
        <table class="table table-borderless">
            <tr>
                <td>
                ${result.uname} 님의 정보를 삭제하시겠습니까?
                </td>
            </tr>
            <tr>
                <td >
                <button type="submit" class="btn btn-danger btn-sm">탈퇴</button>
                <button onclick="location.href='/home'" type="reset" class="btn btn-secondary btn-sm">취소</button>
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