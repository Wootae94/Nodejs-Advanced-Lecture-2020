const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('../mysql.json', 'utf8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
});

const crypto = require('crypto');
let shasum = crypto.createHash('sha256');  //sha256,sha512 중에 하나 사용
shasum.update('1234');
let output = shasum.digest('base64'); //hex, base64 중에 하나 사용


console.log('1234:', output);
console.log(output.length);

conn.connect();

/* let sql = `insert into users (uid,pwd,uname) values(?,?,?);`;
let params_list = [['twkim',output,'김태우']
,['wkjung',output,'정원경']
,['ehlee',output,'이인희']
,['wjno',output,'노원재']
]

for (let params of params_list) {
    conn.query(sql, params, function (error, fields) {
        if (error)
            console.log(error);
    });
}   */


let sql = `INSERT INTO bbs (uname,uid,title,content) VALUES (?,?,?,?);`;
let params_list =  [ 
                    ['홍길동','gdhong', '테스트', '내용을 채우자'],
                    ['홍길동', 'gdhong','first ', '뭐라도 쓰자 '],
                    ['이순신', 'sslee','고민상담', '꽃이 진다고..그대를 잊은적 없다..'],
                    ['임꺽정', 'gjlim','청첩장','다들 오세요!'],
                    ['홍길동', 'gdhong','과제', '할게 많다'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['김태우', 'twkim','내용','뭐넣지...'],
                    ['홍길동', 'gdhong','first ', '뭐라도 쓰자 '],
                    ['홍길동', 'gdhong','first ', '뭐라도 쓰자 '],
                    ['홍길동', 'gdhong','first ', '뭐라도 쓰자 '],
                    ['홍길동', 'gdhong','first ', '뭐라도 쓰자 '],
                    ['홍길동', 'gdhong','first ', '뭐라도 쓰자 '],
                    ['홍길동', 'gdhong','first ', '뭐라도 쓰자 '],
                    ['홍길동', 'gdhong','first ', '뭐라도 쓰자 '],
                    ['홍길동', 'gdhong','first ', '뭐라도 쓰자 ']               
                ]

for (let params of params_list) {
    conn.query(sql, params, function (error, fields) {
        if (error)
            console.log(error);
    });
}

conn.end(); 