DROP TABLE IF EXISTS ranobesInfo CASCADE;
DROP TABLE IF EXISTS ranobes CASCADE;
DROP TABLE IF EXISTS chaptersInfo CASCADE;
DROP TABLE IF EXISTS chapters CASCADE;

CREATE TABLE IF NOT EXISTS ranobesInfo (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS ranobes (
    id SERIAL PRIMARY KEY,
    ranobesInfoId INT REFERENCES ranobesInfo NOT NULL,
    domain VARCHAR(100) NOT NULL,
    source VARCHAR(512) NOT NULL
);
--   Additional:
--   //genre
--   //finished --//get status from source
--   //total chapters
--   //date of last update?

-- Ignore That Right now, seems useless
-- CREATE TABLE IF NOT EXISTS chaptersInfo (
--     id SERIAL PRIMARY KEY,
--     ranobeId INT REFERENCES ranobesInfo,
--     title VARCHAR(250) NOT NULL,
--     nomer INT NOT NULL
-- );

CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    ranobeId INT REFERENCES ranobes,
    -- chapterInfoId INT REFERENCES chaptersInfo,
    nomer INT NOT NULL,
    domain VARCHAR(100) NOT NULL,
    source VARCHAR(512) NOT NULL,
    title VARCHAR(250),
    body TEXT
);