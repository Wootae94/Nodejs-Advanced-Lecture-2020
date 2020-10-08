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

conn.connect();

let sql = `SELECT l.name as name, l.population as population, r.language as language
FROM city AS l
INNER JOIN countrylanguage AS r
ON l.CountryCode=r.CountryCode
WHERE r.IsOfficial  = 'T'
ORDER BY population desc
LIMIT 10;
`;
conn.query(sql, function(error,rows,fields){
    if(error)
        throw error;
    for(let row of rows){
        console.log(row.name,row.population,row.language);
    };
});

conn.end();