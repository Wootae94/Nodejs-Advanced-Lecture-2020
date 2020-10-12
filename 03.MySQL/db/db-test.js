const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

function getConnection () {
    let conn = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port
    });
    conn.connect(function (err) {
        if (err) {
            console.log('mysql connection error :' + err);
        }
    });
    return conn;
}

let sql = `delete from song where sid=?;`;
let conn = getConnection();

        conn.query(sql, 124, function (error, fields) {
            if (error)
                console.log(error);
        });
        conn.end();