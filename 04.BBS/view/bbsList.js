///로그인창
const template = require('./template');
const templateLogout = require('./templateLogout');

module.exports.listForm = function (rows) {
    let tableRow = ''
    for (let row of rows) {
        tableRow += `<tr>
                        <td>${row.uid}</td>
                        <td>${row.uname}</td>
                        <td>${row.regDate}</td>
                        <td>
                            <a href="/user/update/${row.uid}">수정</a>
                            <a href="/user/delete/${row.uid}">삭제</a>
                        </td>
                    </tr>`;
    }
    return `
    
    ${templateLogout.header()}
    <div class="container" style="margin-top: 90px;">  
    <h2>게시판</h2>
    <hr>
    <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
            <table class="table table-borderless">
                <tr>
                    <th>uid</th>
                    <th>이름</th>
                    <th>등록일</th>
                    <th>액션</th>
                </tr>
                     ${tableRow}
        
            </table>
    </div>
    <div class="col-3"></div>
    </div>
    </div>
    ${template.footer()}
    `
};