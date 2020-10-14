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
        let sql = `SELECT uid,uname,date_format(regDate,'%Y-%m-%d %T') AS regDate
                    FROM users03 WHERE isDeleted = 0
                    ORDER BY regDate LIMIT 10;`;
        conn.query(sql, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getUserInfo: function(uid,callback){
        let conn = this.getConnection();
        let sql = `select * from users03 where uid like ?;`;
        conn.query(sql, uid, function (error, results, fields) {
            if (error)
                console.log(error);
            callback(results[0]);
        });
        conn.end();
    },
    deleteUser: function(uid,callback){
        let conn = this.getConnection();
        let sql = `update users03 set isDeleted=1 where uid=?;`;
        conn.query(sql, uid,function (error, fields) {
            if (error)
                console.log(error);
            callback();
    });
    conn.end();
    },
    updateUser: function(params,callback){
        let conn = this.getConnection();
        let sql = `update users03 set pwd=? where uid=?;`;
        conn.query(sql, params,function (error, fields) {
            if (error)
                console.log(error);
            callback();
    });
    conn.end();
    }
};