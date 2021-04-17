DROP TABLE IF EXISTS ranobes CASCADE;
DROP TABLE IF EXISTS chapters CASCADE;

CREATE TABLE IF NOT EXISTS ranobes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    chapter_first INT REFERENCES ranobes,
    chapter_last INT REFERENCES ranobes,
    source VARCHAR(512) NOT NULL
);
--   //Additional:
--   //genre
--   //finished
--   //total chapters
--   //date of last update?

CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    ranobeId INT REFERENCES ranobes,
    title VARCHAR(250) NOT NULL,
    body TEXT NOT NULL
);
-- to add ranobe need only to pass an url
--   //Additional:
--   //finished? //if finished, than don't need to rescrap site
--   //scrap_src //url of origin

--   //suppose for this will be different server (maybe sheduler)
--   //DB: chapters_check_for_update? //here will be chapter, that will be
--   // //checking for update to get things?
--   //id
--   //src
--   //last_checked

--   //also for a ranobe in db will be table with next fields
--   //(this table for extracting chapters of some ranobe)
--   //(also, even if url have in this table, it must be checked for
--   // rules to parse this thing)
--   //DB: extract_src
--   //ranobeName
--   //url with this ranobe (every url must have different hostName)