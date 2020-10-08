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

let sql = `SELECT l.name as Name,DATE_FORMAT(l.debut,"%Y-%m-%d") as debutDate,r.title as songTitle FROM
girl_group AS l
jOIN song AS r
ON l.hit_song_id = r.sid
WHERE debut BETWEEN '2009-01-01'AND '2009-12-31'
order by debut;`;
conn.query(sql, function(error,rows,fields){
    if(error)
        throw error;
    for(let row of rows){
        console.log(row.Name,row.debutDate,row.songTitle);
    };
});

conn.end();