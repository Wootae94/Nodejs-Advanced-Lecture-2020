///로그인창
const template = require('./template');


module.exports.bbsForm = function (rows, uid, uname) {
    let tableRow = ''
    for (let row of rows) {
        tableRow += `<tr class="clickable text-center" 
        onclick="location='/bbs/view/bid/${row.bid}/uid/${row.uid}'">
                        <td>${row.bid}</td>
                        <td>${row.title}</td>
                        <td>${row.uname}</td>
                        <td>${row.modTime}</td>
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
            <table class="table table-borderless table-hover">
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
    </div>
    <div class="col-1"></div>
    </div>
    </div>
    
    ${template.footer()}
    `
};