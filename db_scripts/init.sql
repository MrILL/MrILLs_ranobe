CREATE TABLE IF NOT EXISTS ranobes (
    id VARCHAR(7) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    img_url VARCHAR(2048) NULL,
    eng_title VARCHAR(100) NULL,
    original_title VARCHAR(100) NULL,
    views INTEGER DEFAULT 0
);

--   TODO:
--   //genre
--   //finished --//get status from source
--   //total chapters
--   //date of last update?
CREATE TABLE IF NOT EXISTS ranobe_domains (
    id VARCHAR(7) PRIMARY KEY,
    domain VARCHAR(255) NOT NULL,
    source VARCHAR(2048) NOT NULL,
    ranobe_id VARCHAR(7) NOT NULL,
    total_chapters INTEGER DEFAULT 0,
    authors_name VARCHAR(100) NULL,
    country VARCHAR(100) NULL,
    title_status BOOLEAN DEFAULT FALSE,
    translate_status BOOLEAN DEFAULT FALSE,
    genres VARChAR(200) NULL,
    rating REAL NULL,
    ranobe_description TEXT NULL,
    views INTEGER NULL
);
ALTER TABLE ranobe_domains
ADD FOREIGN KEY (ranobe_id) REFERENCES ranobes ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS chapters (
    id VARCHAR(7) PRIMARY KEY,
    ranobe_domain_id VARCHAR(7) NOT NULL,
    nomer INT NOT NULL,
    source VARCHAR(2048) NOT NULL,
    title VARCHAR(255),
    body TEXT
);
ALTER TABLE chapters
ADD FOREIGN KEY (ranobe_domain_id) REFERENCES ranobe_domains ON DELETE CASCADE;
