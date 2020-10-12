const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

module.exports = {
    getConnection: function () {
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
    },
    getAllLists: function (callback) {
        let conn = this.getConnection();
        let sql = 'SELECT * FROM song ORDER BY sid DESC LIMIT 10;';
        conn.query(sql, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertSong: function (params, callback) {
        let conn = this.getConnection();
        let sql = `insert into song(title,lyrics) values(? ,?)`;

        conn.query(sql, params, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteSong: function (sid, callback) {
        let conn = this.getConnection();
        let sql = `delete from song where sid=?;`;

        conn.query(sql, sid, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getSong:function(sid,callback){
        let conn = this.getConnection();
        let sql = 'SELECT * FROM song where sid = ?;';
        conn.query(sql, sid,function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows[0]);     // 주의할 것
        });
        conn.end();
    },
    updateSong: function (params, callback) {
        let conn = this.getConnection();
        let sql = `update song set title=?,lyrics=? where sid=?;`;
        conn.query(sql, params, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}