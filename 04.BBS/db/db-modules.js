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
                    FROM users WHERE isDeleted = 0
                    ORDER BY regDate
                    limit 10;`;
        conn.query(sql, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getUserInfo: function (uid, callback) {
        let conn = this.getConnection();
        let sql = `select * from users where uid like ?;`;
        conn.query(sql, uid, function (error, results, fields) {
            if (error)
                console.log(error);
            callback(results[0]);
        });
        conn.end();
    },
    deleteUser: function (uid, callback) {
        let conn = this.getConnection();
        let sql = `update users set isDeleted=1 where uid=?;`;
        conn.query(sql, uid, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },

    updateUser: function (params, callback) {
        let conn = this.getConnection();
        let sql = `update users set uid =?, pwd=?, uname =?,tel =?,email=? where uid=?;`;
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    userRegister: function (params, callback) {
        let conn = this.getConnection();
        let sql = `insert into users (uname,uid,pwd) values(?,?,?)`;
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    userDetail: function (params, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE users set tel=?, email=?
        where uid = ?;`
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getBbsLists: function (callback) {
        let conn = this.getConnection();
        let sql = `SELECT bid,title,uid,date_format(modTime,'%Y-%m-%d %T') AS modTime,viewCount
                    FROM bbs WHERE isDeleted = 0
                    ORDER BY modTime
                    limit 10;`;
        conn.query(sql, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    post: function (bid,callback) {
        let conn = this.getConnection();
        let sql = `SELECT b.title as title,b.bid as bid,b.modTime as modTime,b.viewCount as viewCount,b.replyCount as replyCount,
                    b.content as content,r.content as content,r.regTime as regTime from
                    bbs AS b LEFT join reply AS r ON b.bid=r.bid
                    WHERE b.bid=?;`;
        conn.query(sql,bid, function (error, results, fields) {
            if (error)
                console.log(error);
                callback(results[0]);
                
            });
        conn.end();
    }
};