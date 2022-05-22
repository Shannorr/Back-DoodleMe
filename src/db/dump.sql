CREATE TABLE data.users
(
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);

INSERT INTO data.users
  (name, email)
VALUES
  ('Jerry', 'jerry@example.com'),
  ('George', 'george@example.com');

select *
from data.users;