const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('../mysql.json','utf8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
    host :config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    port : config.port
});

const crypto = require('crypto');
let shasum = crypto.createHash('sha256');  //sha256,sha512 중에 하나 사용
shasum.update('1234');
let output = shasum.digest('base64'); //hex, base64 중에 하나 사용


console.log('1234:' , output);
console.log(output.length);

conn.connect();

let sql = `insert into users (uid,pwd,uname) values(?,?,?);`;
let params_list = [['njlee', output,'이나진'],['hskwon', output,'권효승'],['khjoo', output,'주기환'],['hskim', output,'김홍섭'],['kdkwon', output,'권기동'],['kpark', output,'박경'] ]

for (let params of params_list){
    conn.query(sql, params, function(error,fields){
        if(error)
            console.log(error);
    });
}

conn.end();