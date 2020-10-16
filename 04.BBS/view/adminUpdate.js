const template = require('./template');

module.exports.updateForm = function (result) {
    return `
    ${template.header()}
    ${template.navbarAdmin()}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
    <h3>회원 정보 수정</h3>
    <hr>
    <form action="/user/admin/update" method="POST">
        <table class="table table-borderless">
        <tr>
            <td><label for="uname">이름</label></td>
            <td><input type="text" name="uname" id="uname" value="${result.uname}"></td>
        </tr>    
        <tr>
            <td><label for="uid">사용자 ID</label></td>
            <td><input type="text" name="uid" id="uid" value="${result.uid}"></td>
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
            <td><input type="text" name="tel" id="tel" value="${result.tel}"></td>
        </tr>
        <tr>
            <td><label for="email">이메일</label></td>
            <td><input type="text" name="email" id="email" value="${result.email}"></td>
        </tr>
        <tr>
            <td style="text-align : right"><button type="submit" class="btn btn-primary btn-sm">변경</button>
            <button onclick="location.href='/user/admin/list'" type="reset" class="btn btn-secondary btn-sm">취소</button></td>
        </tr>
        </table>
    </form>
    </div>
    <div class="col-2"></div>
    </div>
    </div>
    ${template.footer()}
    `
};