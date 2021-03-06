module.exports.mainForm = function (rows,uname) {
    let tableRow = ''
    for (let row of rows) {
        tableRow += `<tr>
                        <td>${row.uid}</td>
                        <td>${row.uname}</td>
                        <td>${row.regDate}</td>
                        <td>
                            <a href="#">수정</a>
                            <a href="#">삭제</a>
                        </td>
                    </tr>`;
    }

    return `
   <!DOCTYPE html>
    <html lang="ko">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>사용자 관리</title>
    <style>
    table {
      width: 100%;
      text-align : center;
    }
    
    </style>
    </head>
    <body>
        <h3>사용자 조회</h3>
        <p>${uname}님 환영합니다.&nbsp;&nbsp;&nbsp;<a href = "/logout">로그아웃</a></p>
        <hr>
        <table>
            <tr>
                <th>uid</th>
                <th>이름</th>
                <th>등록일</th>
                <th>액션</th>
            </tr>
                 ${tableRow}
            <tr>
                <td colspan="4" style="text-align: center">
                    <button onclick="location.href='/login'">로그인</button>
                </td>
            </tr>
        </table>
    
    </body>
    </html>
    `;

}