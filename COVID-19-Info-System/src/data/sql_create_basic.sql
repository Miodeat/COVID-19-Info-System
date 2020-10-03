-- drop table epidemic_data;
create table epidemic_datas(
	id serial primary key,
	province varchar,
	country varchar not null ,
	lon float not null,
	lat float not null,
	update_time date null,
	confirmed int not null default 0,
	death int not null default 0,
	recovered int not null default 0
	);

-- DROP INDEX country_index;
-- DROP INDEX update_time_index;
-- CREATE INDEX country_index on epidemic_datas(country);
-- CREATE INDEX update_time_index on epidemic_datas(update_time);

copy epidemic_datas(province,country,lon,lat,update_time,confirmed,death,recovered)
 from
	'D:/Projects/COVID-19-Info-System/uniformed.csv'
 DELIMITER ',';


