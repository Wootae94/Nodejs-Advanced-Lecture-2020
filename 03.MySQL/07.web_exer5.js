const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json','utf8');

let connInfo = JSON.parse(info);
let conn = mysql.createConnection({
    host :connInfo.host,
    user : connInfo.user,
    password : connInfo.password,
    database : connInfo.database,
    port : connInfo.port
});
let sql = `SELECT l.name as name, l.population as population, r.language as language
FROM city AS l
INNER JOIN countrylanguage AS r
ON l.CountryCode=r.CountryCode
WHERE r.IsOfficial  = 'T'
ORDER BY population desc
LIMIT 10;
`;
let html = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>연습문제 5</title>
</head>
<body>
    <h3>연습문제 5</h3>
    <hr>
    <table>
        <tr>
            <th>도시명</th>
            <th>인구수</th>
            <th>공식언어</th>
        </tr>
        
`

let server = http.createServer(function(request, response){
    conn.connect();
    conn.query(sql, function(error,rows,fields){
        if(error)
            throw error;
        for(let row of rows){
            html += `<tr><td>${row.name}</td>
            <td>${row.population}</td>
            <td>${row.language}</td></tr>`
        };
        html += `</table>
                 </body>
                 </html>`;
        response.end(html);
    });
    conn.end();
});
server.listen(3000);



