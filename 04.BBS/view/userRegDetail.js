///로그인창
const template = require('./template');

module.exports.userDetail = function (result) {
    return `
    ${template.header()}
    ${template.navbarReg()}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
    <h2>회원가입</h2>
    <hr>
                <form action="/user/register/detail" method="POST">
                <input type="hidden" name="uid" value="${result.uid}">
                    <table class="table table-borderless">
                        <tr>
                        <td colspan="2" style="text-align: center;">
                        선택사항입니다.
                        </td>
                        </tr>
                        <tr>
                            <td><label for="tel">전화번호</label></td>
                            <td><input type="text" name="tel" id="tel" placeholder = "010-XXXX-XXXX"></td>
                        </tr>
                        <tr>
                            <td><label for="email">이메일</label></td>
                            <td><input type="text" name="email" id="email" placeholder = "ABC@XXXX.xxx"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <button type="submit" class="btn btn-primary btn-sm">가입</button>
                                <button onclick="location.href='/home'" type="reset" class="btn btn-secondary btn-sm">취소</button>
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