
const template = require('./template');

module.exports.registerForm = function () {
    return `
    ${template.header()}
    <div class="container" style="margin-top: 90px;">  
    <h2>회원가입</h2>
    <hr>
    <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
                <form action="/user/register" method="POST">
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
                                <button type="submit" class="btn btn-primary">다음</button>
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