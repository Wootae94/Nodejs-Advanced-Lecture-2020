///로그인창
const template = require('./template');

module.exports.userUpload = function () {
    return `
    ${template.header()}
    ${template.navbarReg()}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
    <h2>회원가입</h2>
    <hr>
    <h3>회원 프로필사진</h3>
    <form action='/user/register/detail/upload/uid' method='post' enctype="multipart/form-data">
    <div class="form-group">
      <input type="file" class="form-control-file border" name="userfile">
    </div>
    
    <button type="submit" class="btn btn-primary">가입</button>
    <button onclick="location.href='/login'" type="reset" class="btn btn-secondary btn-sm">취소</button></td>
    </form>
    </div>
    <div class="col-3"></div>
    </div>
    </div>
    ${template.footer()}
    `
};