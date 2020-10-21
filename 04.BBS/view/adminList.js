///로그인창
const template = require('./template');


module.exports.listForm = function (rows,pageNo, startPage, endPage, totalPage,router) {
    let tableRow = ''
    for (let row of rows) {
        tableRow += `<tr>
                        <td>${row.uid}</td>
                        <td><strong>${row.uname}</strong></td>
                        <td>${row.regDate}</td>
                        <td>
                            <a href="/user/admin/update/${row.uid}">수정</a>
                            <a href="/user/admin/delete/${row.uid}">삭제</a>
                        </td>
                    </tr>`;
    }
    return `
    ${template.header()}
    ${template.navbarAdmin()}
    <div class="container" style="margin-top: 90px;">  
    <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
    <h2>회원관리</h2>
    <hr>
            <table class="table table-borderless" style="text-align : center;">
            <thead class="thead-light" >
                <tr>
                    <th>uid</th>
                    <th>이름</th>
                    <th>등록일</th>
                    <th>액션</th>
                </tr>
            </thead>
                     ${tableRow}
        
            </table>
            <ul class="pagination justify-content-center">
            ${template.page(pageNo, startPage, endPage, totalPage,router)}
            </ul>
    </div>
    <div class="col-2"></div>
    </div>
    </div>
    ${template.footer()}
    `
};