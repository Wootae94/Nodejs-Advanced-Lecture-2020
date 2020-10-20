
const template = require('./template');
const ut = require('../04.utill');

module.exports.bbsForm = function (rows, uid, uname,pageNo, startPage, endPage, totalPage) {
    
    ///페이지 처리
    let leftPage = (pageNo > 10) ? `/bbs/list/${Math.floor(pageNo/10) * 10}` : '#';
    let pages = `<li class="page-item">
                    <a class="page-link active" href="${leftPage}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span></a>
                </li>`;
    for (let page = startPage; page <= endPage; page++) {
        if (page === pageNo)
            pages += `<li class="page-item active" aria-current="page">
                        <span class="page-link">
                            ${page}<span class="sr-only">(current)</span>
                        </span>
                    </li>`;
        else
            pages += `<li class="page-item"><a class="page-link" href="/bbs/list/${page}">${page}</a></li>`;
    }
    let rightPage = (endPage < totalPage) ? `/bbs/list/${Math.ceil(pageNo/10)*10 + 1}` : '#';
    pages += `<li class="page-item">
                <a class="page-link" href="${rightPage}" aria-label="Next">
                <span aria-hidden="true">&raquo;</span></a>
            </li>`;

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
    <div class="container" style="margin-top: 90px;">  
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
            ${pages}
            </ul>
    </div>
    <div class="col-1"></div>
    </div>
    </div>
    ${template.footer()}
    `
};