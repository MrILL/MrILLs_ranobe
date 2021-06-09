CREATE TABLE IF NOT EXISTS ranobes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS ranobeDomains (
    id SERIAL PRIMARY KEY,
    ranobeId INT REFERENCES ranobes NOT NULL,
    domain VARCHAR(100) NOT NULL,
    source VARCHAR(512) NOT NULL
);
--   TODO:
--   //genre
--   //finished --//get status from source
--   //total chapters
--   //date of last update?

CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    ranobeDomainId INT REFERENCES ranobeDomains,
    nomer INT NOT NULL,
    source VARCHAR(512) NOT NULL,
    title VARCHAR(250),
    body TEXT
);
-- TODO deside about changing type of 'nomer' from INT to VARCHAR