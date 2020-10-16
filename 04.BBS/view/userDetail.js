const template = require('./template');

module.exports.userDetail = function (result, uid, uname) {
    return `
    ${template.header()}
    ${template.navbarUser(uid, uname)}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
    <h3>회원 정보</h3>
    <hr>
    <form action="/user/admin/update" method="POST">
        <table class="table table-borderless">
            <tr>
                <td><label for="uname">이름</label></td>
                <td>${result.uname}</td>
            </tr>    
            <tr>
                <td><label for="uid">사용자 ID</label></td>
                <td>${result.uid}</td>
            </tr>
            <tr>
                    <td><label for="tel">전화번호</label></td>
                    <td>${result.tel}</td>
            </tr>
            <tr>
                    <td><label for="email">이메일</label></td>
                    <td>${result.email}</td>
            </tr>
            <tr>
            <td colspan="2" style="text-align : right"><button onclick="location.href='/user/update/uid/${result.uid}'" type="reset" class="btn btn-primary btn-sm" >수정</button>
            <button onclick="location.href='/user/delete/uid/${result.uid}'" type="reset" class="btn btn-danger btn-sm">탈퇴</button></td>
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