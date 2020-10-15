const template = require('./template');
const templateLogout = require('./templateLogout');   
module.exports.deleteForm = function (result) {
    return `
    ${templateLogout.header(result.uid)}
    <div class="container" style="margin-top: 90px;">  
    <h3>회원 정보 삭제</h3>
    <hr>
    <form action="/user/admin/delete" method="POST">
        <input type="hidden" name="uid" value="${result.uid}">
        <table class="table table-borderless">
            <tr>
                <td>
                ${result.uid} 을/를 삭제하시겠습니까?
                </td>
            </tr>
            <tr>
                <td >
                <button type="submit" class="btn btn-danger btn-sm">삭제</button>
                </td>
            </tr>
            </table>
    </form>
    </div>
    ${template.footer()}
    `
};