CREATE TABLE IF NOT EXISTS ranobes (
    id VARCHAR(7) PRIMARY KEY,
    title VARCHAR(100) NOT NULL
);

--   TODO:
--   //genre
--   //finished --//get status from source
--   //total chapters
--   //date of last update?
CREATE TABLE IF NOT EXISTS ranobeDomains (
    id VARCHAR(7) PRIMARY KEY,
    ranobeId VARCHAR(7) NOT NULL,
    domain VARCHAR(255) NOT NULL,
    source VARCHAR(2048) NOT NULL
);
ALTER TABLE ranobeDomains ADD FOREIGN KEY (ranobeId) REFERENCES ranobes ON DELETE CASCADE;

-- TODO deside about changing type of 'nomer' from INT to VARCHAR
CREATE TABLE IF NOT EXISTS chapters (
    id VARCHAR(7) PRIMARY KEY,
    ranobeDomainId VARCHAR(7) NOT NULL,
    nomer INT NOT NULL,
    source VARCHAR(2048) NOT NULL,
    title VARCHAR(255),
    body TEXT
);
ALTER TABLE chapters ADD FOREIGN KEY (ranobeDomainId) REFERENCES ranobeDomains ON DELETE CASCADE;
