CREATE TABLE IF NOT EXISTS owners (
    id SERIAL PRIMARY KEY,
    ownername TEXT,
    password TEXT,
    profile_pic TEXT
);
CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    url TEXT,
    home INTEGER,
    owner INTEGER
);
CREATE TABLE IF NOT EXISTS homes (
    id SERIAL PRIMARY KEY,
    location TEXT,
    cost INTEGER,
    home INTEGER,
    owner INTEGER
);

