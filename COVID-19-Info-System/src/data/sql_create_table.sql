
drop table  twitter_data;
create table twitter_data(
	id serial primary key,
	tweet_id varchar null,
	lon float null,
	lat float null,
	country varchar null,
	province varchar null,
	release_time date not null,
	nb_label boolean not null default false,
	retweet_count varchar not null default 0
	);

drop table collective_rationality;
create table collective_rationality(
	id serial primary key,
	country varchar not null,
	update_time int not null ,
	from_time date not null default 2020-01-01,
	to_time date not null default 2020-01-01
	rationality float not null,
	Na0 float not null,
	Nb0 float not null,
	Na1 float not null,
	Nb1 float not null,
	c float not null,
	vA float not null,
	vB float not null
	);


DROP INDEX country_index;
CREATE INDEX country_index on collective_rationality(country);


drop table  geo_data;
create table geo_data(
	id serial primary key,
	country varchar not null,
	population bigint not null,
	area float null,
	release_time date null
	);

copy collective_rationality
 from 
 'D:/data/data/CollectiveRationality.csv'
 DELIMITER ',';


copy geo_data(country,population)
 from
 'D:/data/data/country.csv'
 DELIMITER ',';

copy twitter_data(tweet_id,lon,lat,country,province,release_time,nb_label,retweet_count)
 from 
 'D:/data/data/TweetData.csv'
 DELIMITER ',';

