CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);
INSERT INTO blogs (author, url, title, likes) VALUES ('Dan Abramov', 'http://example.com/1', 'On let vs const', 0);
INSERT INTO blogs (author, url, title) VALUES ('Laurenz Albe', 'http://example.com/2', 'Gaps in sequences in PostgreSQL');
