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

let sql = `SELECT continent,COUNT(*) as count ,SUM(GNP) as sumGNP, round(AVG(GNP),2) as avgGNP 
FROM country
group by continent;`;
conn.query(sql, function(error,rows,fields){
    if(error)
        throw error;
    for(let row of rows){
        console.log(row.continent,row.count,row.sumGNP,row.avgGNP);
    };
});

conn.end();