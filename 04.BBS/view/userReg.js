
const template = require('./template');

module.exports.registerForm = function () {
    return `
    ${template.header()}
    ${template.navbarReg()}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
    <h2>회원가입</h2>
    <hr>
                <form action="/user/register" method="POST" enctype="multipart/form-data">
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
                        <td colspan="2">
                        <p style="text-align:center">선택사항입니다.</p>
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
                            <td><label for="photo">사진</label></td>
                            <td>
                                <div class="custom-file mb-3">
                                    <input type="file" class="custom-file-input" id="photo" name="photo">
                                    <label class="custom-file-label" for="photo">업로드할 사진 파일 선택</label>
                                </div>
                            </td>
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
            <div class="col-2"></div>
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