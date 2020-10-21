const template = require('./template');
const ut = require('../04.utill');

module.exports.bbsForm = function (rows, uid, uname, pageNo, startPage, endPage, totalPage,router) {
    ///테이블 생성
    let tableRow = ''
    for (let row of rows) {
        tableRow += `<tr class="clickable text-center" 
        onclick="location='/bbs/view/bid/${row.bid}/uid/${row.uid}'" style="cursor:pointer">
                        <td>${row.bid}</td>
                        <td>${row.title}&nbsp&nbsp<span class="badge  badge-danger">${row.replyCount}</span></td>
                        <td>${row.uname}</td>
                        <td>${ut.displayTime(row.modTime)}</td>
                        <td>${row.viewCount}</td>
                    </tr>`;
    }
    return `
    
    ${template.header()}
    ${template.navbarUser(uid, uname)}
    <div class="container" style="margin-top: 130px;">  
    <div class="row">
    <div class="col-1"></div>
    <div class="col-10">
    <h2>게시판</h2>
    <hr>
            <table class="table table-borderless table-hover" style="margin-bottom : 90px">
                <thead class="thead-light" style="text-align : center;">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                     ${tableRow}
                </tbody>
            </table>
            <ul class="pagination justify-content-center">
            ${template.page(pageNo, startPage, endPage, totalPage,router)}
            </ul>
    </div>
    <div class="col-1"></div>
    </div>
    </div>
    ${template.footer()}
    `
};