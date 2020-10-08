#1번 
SELECT NAME,date_format(debut,'%Y-%m-%d') as debutDate FROM girl_group WHERE debut BETWEEN '2009-01-01' AND '2009-12-31';

#2번
SELECT l.name as Name,DATE_FORMAT(l.debut,"%Y-%m-%d") as debutDate,r.title as songTitle FROM
girl_group AS l
jOIN song AS r
ON l.hit_song_id = r.sid
WHERE debut BETWEEN '2009-01-01'AND '2009-12-31';

#3번
SELECT continent,COUNT(*),SUM(`GNP`), round(AVG(`GNP`),2) FROM country
	  group by continent;

#4번
SSELECT l.continent as continent,l.name as Countryname,r.name as Cityname,r.population as population FROM 
country AS l
INNER JOIN city AS r
ON l.code=r.CountryCode
WHERE l.continent = 'asia'
ORDER BY r.Population desc
LIMIT 10;

#5번
SELECT l.name as name, l.population as population, r.language as language
FROM city AS l
INNER JOIN countrylanguage AS r
ON l.CountryCode=r.CountryCode
WHERE r.IsOfficial  = 'T'
ORDER BY population desc
LIMIT 10;
