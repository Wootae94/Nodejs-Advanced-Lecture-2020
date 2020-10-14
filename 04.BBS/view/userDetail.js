///로그인창
const template = require('./template');

module.exports.userDetail = function (result) {
    return `
    ${template.header()}
    <div class="container" style="margin-top: 90px;">  
    <h2>회원가입</h2>
    <hr>
    <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
                <form action="/user/register" method="POST">
                <input type="hidden" name="uid" value="${result.uid}">
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="tel">전화번호</label></td>
                            <td><input type="text" name="tel" id="tel"></td>
                        </tr>
                        <tr>
                            <td><label for="email">이메일</label></td>
                            <td><input type="text" name="email" id="email"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-primary">가입</button>
                                <button onclick="location.href='/home'" type="reset" class="btn btn-secondary">취소</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
    ${template.footer()}
    `
};