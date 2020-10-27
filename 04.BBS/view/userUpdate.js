const template = require('./template');

module.exports.updateForm = function (result,uid,uname) {
    return `
    ${template.header()}
    ${template.navbarUser(uid,uname)}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
    <h3>회원 정보 수정</h3>
    <hr>
    <form action="/user/update/uid" method="post" enctype="multipart/form-data">
    <input type="hidden" name="uid" value="${result.uid}">
    <input type="hidden" name="pwdHash" value="${result.pwd}">
    <table class="table table-borderless">
        <tr>
            <td><label for="uid">사용자 ID</label></td>
            <td><span id="uid">${result.uid}</span></td>
            <td rowspan="6">
                <img src="${result.photo}" width="150">
            </td>
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
            <td><label for="uname">이름</label></td>
            <td><input type="text" name="uname" id="uname" value="${result.uname}"></td>
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
            <td><label for="photo">사진</label></td>
            <td colspan="2">
                <div class="custom-file mb-3">
                    <input type="file" class="custom-file-input" id="photo" name="photo">
                    <label class="custom-file-label" for="photo">업로드할 사진 파일 선택</label>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: center;">
                <button type="submit" class="btn btn-danger btn-sm">수정</button>
                <button onclick="location.href='/user/uid/${result.uid}'" type="reset" class="btn btn-secondary btn-sm">취소</button>
            </td>
        </tr>
    </table>
</form>
    </div>
    <div class="col-3"></div>
    </div>
    </div>
    ${template.footer()}
    <script>
           // Add the following code if you want the name of the file appear on select
           $(".custom-file-input").on("change", function () {
               var fileName = $(this).val().split("\\\\").pop();
               $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
           });
    </script>
    </body>
</html>
    `
};