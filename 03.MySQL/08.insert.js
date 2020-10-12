const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json','utf8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
    host :config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    port : config.port
});

conn.connect();

let sql = `insert into song(title,lyrics) values('살짝 설렜어', '살짝 설렜어 난 oh nanananana
')`;
conn.query(sql, function(error,rows,fields){
    if(error)
        console.log(error);;
});

conn.end();