module.exports.JoinForm = function (rows) {
    let tableRow = ''
    for (let row of rows){
        tableRow += `<tr>
                        <td>${row.ggid}</td>
                        <td>${row.NAME}</td>
                        <td>${row.debut ? row.debut:''}</td>
                        <td>${row.title ? row.title:''}</td>
                        <td>
                            <a href="/update/${row.ggid}">수정</a>
                            <a href="/delete/${row.ggid}">삭제</a>
                        </td>
                    </tr>`;
    }

    return `
   <!DOCTYPE html>
    <html lang="ko">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>걸그룹 조회</title>
    <style>
    table {
      width: 100%;
      border: 1px solid #444444;
    }
    th, td {
      border: 1px solid #444444;
    }
    </style>
    </head>
    <body>
        <h3>걸그룹 조회</h3>
        <hr>
        <table>
        <tr>
        <th>ggid</th>
        <th>가수</th>
        <th>데뷔일</th>
        <th>히트송</th>
        <th>액션</th>
        </tr>
        ${tableRow}
        </table>
        <hr>
        <button onclick="location.href='/insert'">추가</button>
    </body>
    </html>
    `;

}