///로그인창
const template = require('./template');


module.exports.listForm = function (rows, pageNo, startPage, endPage, totalPage, router, uid, uname) {
    let tableRow = ''
    for (let row of rows) {
        tableRow += `<tr class="clickable text-center" 
        onclick="location='/user/uid/${row.uid}'" style="cursor:pointer">
                        <td>${row.uid}</td>
                        <td><strong>${row.uname}</strong></td>
                        <td><img style="margin-left: 30px;" src="${row.photo}" width="50"></td>
                        <td>${row.regDate}</td>
                        <td>
                            <a href="/user/update/uid/${row.uid}"><i class="fas fa-user-edit"></i></a>
                            <a href="/user/delete/uid/${row.uid}"><i class="fas fa-user-slash"></i></a>
                        </td>
                    </tr>`;
    }
    return `
    ${template.header()}
    ${template.navbarUser(uid, uname)}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
    <h2>회원관리</h2>
    
    <hr>
            <table class="table table-borderless table-hover" style="text-align : center;">
            <thead class="thead-light" >
                <tr>
                    <th>uid</th>
                    <th>이름</th>
                    <th>프로필사진</th>
                    <th>등록일</th>
                    <th>액션</th>
                </tr>
            </thead>
                     ${tableRow}
        
            </table>
            <ul class="pagination justify-content-center">
            ${template.page(pageNo, startPage, endPage, totalPage, router)}
            </ul>
    </div>
    <div class="col-2">
    <button onclick="location.href='/user/uid/admin/chart'" class="btn btn-primary btn-sm" style="float:right;">게시판관리</button></div>
    </div>
    </div>
    ${template.footer()}
    <br>
    
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    </body>
</html>
    `
};