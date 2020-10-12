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
        let sql = `SELECT ggid, NAME, DATE_FORMAT(debut,'%Y-%m-%d') as debut FROM girl_group ORDER BY ggid DESC 
        LIMIT 5;`;
        conn.query(sql, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    }, getJoinLists: function (callback) {
        let conn = this.getConnection();
        let sql = 
        `SELECT gg.ggid,gg.NAME,DATE_FORMAT(gg.debut,'%Y-%m-%d') as debut,song.title FROM girl_group AS gg 
        left JOIN song
        ON song.sid=gg.hit_song_id
        ORDER BY gg.ggid DESC 
        LIMIT 5
        ;`;
        conn.query(sql, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertGroup: function (params, callback) {
        let conn = this.getConnection();
        let sql = `insert into girl_group(NAME,debut) values(? ,?)`;

        conn.query(sql, params, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteGroup: function (ggid, callback) {
        let conn = this.getConnection();
        let sql = `delete from girl_group where ggid=?;`;

        conn.query(sql, ggid, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getGroup:function(ggid,callback){
        let conn = this.getConnection();
        let sql = `SELECT ggid, NAME, DATE_FORMAT(debut,'%Y-%m-%d') as debut FROM girl_group ORDER BY ggid DESC 
        LIMIT 5;`;
        conn.query(sql, ggid,function (error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows[0]);     // 주의할 것
        });
        conn.end();
    },
    updateGroup: function (params, callback) {
        let conn = this.getConnection();
        let sql = `update girl_group set NAME=?,debut=? where ggid=?;`;
        conn.query(sql, params, function (error, rows, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}