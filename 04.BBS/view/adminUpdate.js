const template = require('./template');
const templateLogout = require('./templateLogout');   
module.exports.updateForm = function () {
    return `
    ${templateLogout.header()}
    <div class="container" style="margin-top: 90px;">  
    <h3>회원 정보 수정</h3>
    <hr>
    <form action="/user/admin/update" method="POST">
        <table class="table table-borderless">
            <tr>
                <td><label for="uname">이름</label></td>
                <td><input type="text" name="uname" id="uname"></td>
            </tr>    
            <tr>
                <td><label for="uid">사용자 ID</label></td>
                <td><input type="text" name="uid" id="uid"></td>
            </tr>
            <tr>
                <td><label for="pwd">패스워드</label></td>
                <td><input type="password" name="pwd" id="pwd"></td>
            </tr>
            <tr>
                <td><label for="pwd2">패스워드 확인</label></td>
                <td><input type="password" name="pwd2" id="pwd2"></td>
            </tr>
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
                <td colspan="2"><input type="submit" value="변경"></td>
            </tr>
        </table>
    </form>
    </div>
    ${template.footer()}
    `
};