const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json','utf8');
let connInfo = JSON.parse(info);
let conn = mysql.createConnection({
    host :connInfo.host,
    user : connInfo.user,
    password : connInfo.password,
    database : connInfo.database,
    port : connInfo.port
});

conn.connect();

let sql = `SELECT l.continent as continent,l.name as Countryname,r.name as Cityname,r.population as population FROM 
country AS l
INNER JOIN city AS r
ON l.code=r.CountryCode
WHERE l.continent = 'asia'
ORDER BY r.Population desc
LIMIT 10;
`;
conn.query(sql, function(error,rows,fields){
    if(error)
        throw error;
    for(let row of rows){
        console.log(row.continent,row.Countryname,row.Cityname,row.population);
    };
});

conn.end();