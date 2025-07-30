CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('David', 'https://example.com', 'My first post');

INSERT INTO blogs (author, url, title) VALUES ('Anton', 'https://another-example.com', 'Learn about postgres');