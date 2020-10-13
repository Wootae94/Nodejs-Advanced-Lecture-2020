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
const crypto = require('crypto');

// SHA: Secure Hash Algorithm
let shasum = crypto.createHash('sha256');  //sha256,sha512 중에 하나 사용
shasum.update('1234');
let output = shasum.digest('base64'); //hex, base64 중에 하나 사용


console.log('1234:' , output);
console.log(output.length);
conn.connect();

let sql = `insert into users(uid,pwd,name) values(?,?,?);`;
let params = [ 'sylee', output,'이수연' ]
conn.query(sql, params, function(error,rows,fields){
    if(error)
        console.log(error);;
});

conn.end();