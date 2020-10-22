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

let sql = `insert into users (uid,pwd,uname,tel,email,photo) values(?,?,?,?,?);`;
let params_list = [['gdhong', output, '홍길동'],['sslee',output,'이순신']
,['yjchoi',output,'최영조']
,['jwheo',output,'허진우']
,['hobong',output,'봉현오']
,['dhhan',output,'한동현']
,['mgyang',output,'양민규']
,['wgpark',output,'박원근']
,['hsji',output,'지현성']
,['djkim',output,'김동준']]

for (let params of params_list) {
    conn.query(sql, params, function (error, fields) {
        if (error)
            console.log(error);
    });
} 

/* insert into board(pass, name, email, title, content)
values('1234', '홍길동' , 'nude@gmail.com', 'first writing', '안녕하세용 내이름은...');
insert into board(pass, name, email, title, content)
values('1234', '홍길동' , 'nude@gmail.com', '가입인사', '잘지내봐요');
insert into board(pass, name, email, title, content)
values('1234', '이순신' , 'lee4141@gmail.com', '고민상담', '꽃이 진다고..그대를 잊은적 없다..');
insert into board(pass, name, email, title, content)
values('1234', '임꺽정' , 'igj0412@gmail.com', '청첩장', '다들 오세요!'); */
/* let sql = `INSERT INTO bbs (uname,uid,title,content) VALUES (?,?,?,?);`;
let params_list = [ 
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
} */

conn.end();