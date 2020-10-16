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
        let sql = `select * from users where uid like ? and isDeleted=0;`;
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
        let sql = `SELECT b.bid as bid,b.title as title, b.uname as uname,u.uid as uid,
        date_format(b.modTime,'%Y-%m-%d %T') AS modTime, b.viewCount
                    FROM bbs as b
                    left join users as u on b.uname=u.uname
                    WHERE b.isDeleted = 0
                    ORDER BY b.modTime desc
                    limit 10;`;
        conn.query(sql, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getBbsView: function (bid,callback) {
        let conn = this.getConnection();
        let sql = `SELECT b.title as title,
        b.uname as uname,
        b.bid as bid,
        date_format(b.modTime,'%Y-%m-%d %T') AS modTime,
        b.viewCount as viewCount,
        b.replyCount as replyCount,
        b.content as content,
        r.content AS replyContent,
        r.regTime as regTime 
        from bbs AS b LEFT join reply AS r ON b.bid=r.bid
        WHERE b.bid=?;`;
        conn.query(sql,bid, function (error, results, fields) {
            if (error)
                console.log(error);
                callback(results[0]);
            });
        conn.end();
    },
    regBbsWrite: function(params,callback){
        let conn = this.getConnection();
        let sql = `insert into bbs (uname,title,content) values(?,?,?)`;
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();

    },
    updateBbs: function (params, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set title =?, content=?, modTime=now() where bid=?;`;
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteBbs: function (bid, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set isDeleted = 1 where bid=?;`;
        conn.query(sql, bid, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }

};