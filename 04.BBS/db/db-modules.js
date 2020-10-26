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
    getAllLists: function (offset,callback) {
        let conn = this.getConnection();
        let sql = `SELECT uid,uname,date_format(regDate,'%Y-%m-%d %T') AS regDate,photo
                    FROM users WHERE isDeleted = 0
                    ORDER BY regDate
                    limit 10 offset ?;`;
        conn.query(sql,offset, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getUsersTotalCount:     function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT count(*) as count FROM users where isDeleted=0;`;
        conn.query(sql, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);   
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

    updateUser: function (params, photo, uid, callback) {
        let conn = this.getConnection();
        let sql;
            if (photo) {
                sql = `update users set pwd=?, uname=?, tel=?, email=?, photo=? where uid=?;`;
                params.push(photo); 
                params.push(uid);
            } else {
                sql = `update users set pwd=?, uname=?, tel=?, email=? where uid=?;`;
                params.push(uid);
            }
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    userRegister: function (params, callback) {
        let conn = this.getConnection();
        let  sql = `insert into users(uid, pwd, uname, tel, email, photo) values(?,?,?,?,?,?);`;
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getBbsLists: function (offset,callback) {
        let conn = this.getConnection();
        let sql = `SELECT bid,
                    title, 
                    uname,      
                    uid,
                    date_format(modTime,'%Y-%m-%d %T') AS modTime, 
                    viewCount,
                    replyCount
                    FROM bbs
                    WHERE isDeleted = 0
                    ORDER BY bid desc
                    limit 10 offset ?;`;
        conn.query(sql,offset, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getBbsTotalCount:     function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT count(*) as count FROM bbs where isDeleted=0;`;
        conn.query(sql, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);   
        });
        conn.end();
    },
    getBbsSearch: function (title,callback) {
        let conn = this.getConnection();
        let sql = `SELECT bid,
                    title, 
                    uname,      
                    uid,
                    date_format(modTime,'%Y-%m-%d %T') AS modTime, 
                    viewCount,
                    replyCount
                    FROM bbs
                    WHERE isDeleted = 0 and title like` + '"%'+title+'%"'+
                    `ORDER BY modTime desc
                    limit 10;`;
        conn.query(sql,title, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getBbsData: function (bid,callback) {
        let conn = this.getConnection();
        let sql = ` SELECT b.title as title,
                    b.uname as uname,
                    b.uid as uid,
                    b.bid as bid,
                    date_format(b.modTime,'%Y-%m-%d %T') AS modTime,
                    b.viewCount as viewCount,
                    b.replyCount as replyCount,
                    b.content as content,
                    r.content AS replyContent,
                    date_format(r.regTime,'%Y-%m-%d %T') as regTime 
                    from bbs AS b LEFT join reply AS r ON b.bid=r.bid
                    WHERE b.bid=?;`;
        conn.query(sql,bid, function (error, results, fields) {
            if (error)
                console.log(error);
                callback(results[0]);
            });
        conn.end();
    },
    getBbsChart: function(callback){
        let conn = this.getConnection();
        let sql = `SELECT bid,
                    title, 
                    uname,      
                    uid,
                    date_format(modTime,'%Y-%m-%d %T') AS modTime, 
                    viewCount,
                    replyCount
                    FROM bbs
                    WHERE isDeleted = 0
                    ORDER BY viewCount desc
                    limit 6;`;
        conn.query(sql, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    regBbsWrite: function(params,callback){
        let conn = this.getConnection();
        let sql = `insert into bbs (uid,uname,title,content) values(?,?,?,?)`;
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
    },
    incViewCount: function(uid,sessionUid,bid,callback){
        let conn = this.getConnection();
        let sql; 
        if(uid!==sessionUid){
            sql = `update bbs set viewCount=viewCount+1 where bid=?;`;
        }
        conn.query(sql, bid, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    regReply: function(params,callback){
        let conn = this.getConnection();
        let sql = `insert into reply (bid,uid,uname,content,isMine) values(?,?,?,?,?);`;
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    viewReply: function(bid,callback){
        let conn = this.getConnection();
        let sql = ` SELECT uname,
                           content,
                           date_format(regTime,'%Y-%m-%d %T') AS regTime,
                           isMine
                           from reply
                           WHERE bid=?;`;
        conn.query(sql,bid, function (error, rows, fields) {
            if (error)
                console.log(error);
                callback(rows);
            });
        conn.end();
    },
    replyCount: function(bids,callback){
        let conn = this.getConnection();
        let sql = `UPDATE bbs AS b
                   SET b.replyCount = (SELECT COUNT(if(r.bid=?,r.bid,NULL))FROM reply AS r)
                   WHERE b.bid=?;`;
        conn.query(sql, bids, function (error,fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
};