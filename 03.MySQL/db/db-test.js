const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('../mysql.json', 'utf8');
let config = JSON.parse(info);

function getConnection() {
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


let sql = `SELECT song.sid, song.title, gg.NAME,song.lyrics FROM song 
left JOIN girl_group AS gg
ON song.sid=gg.hit_song_id
ORDER BY song.sid DESC 
LIMIT 10
;`
let conn = getConnection();
conn.query(sql, function (error, fields) {
    if (error)
        console.log(error);
});
conn.end();