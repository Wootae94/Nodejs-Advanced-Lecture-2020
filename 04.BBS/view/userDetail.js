const template = require('./template');

module.exports.userDetail = function (result,uid,uname) {
    return `
    ${template.header()}
    ${template.navbarUser(uid,uname)}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
    <h3>회원 정보</h3>
    <hr>
        <table class="table table-borderless">
            <tr>
                <td><label for="uid">사용자 ID</label></td>
                <td>${result.uid}</td>
                <td rowspan="4">
                    <img style="margin-left: 30px;" src="${result.photo}" width="150">
                </td>
            </tr>
            <tr>
                <td><label for="uname">이름</label></td>
                <td>${result.uname}</td>
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
            <td colspan="3" style="text-align : center"><button onclick="location.href='/user/update/uid/${result.uid}'" class="btn btn-primary btn-sm" >수정</button>
            <button onclick="location.href='/user/delete/uid/${result.uid}'" class="btn btn-danger btn-sm">탈퇴</button><button onclick="location.href='/home'" class="btn btn-secondary btn-sm">뒤로</button></td>
            </tr>
        </table>
    </div>
    <div class="col-2"></div>
    </div>
    </div>
    ${template.footer()}
    `
};