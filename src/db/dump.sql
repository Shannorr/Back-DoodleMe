DROP TABLE data.rolesxusers;
DROP TABLE data.roles;
DROP TABLE data.users;

CREATE TABLE data.users
(
  id SERIAL PRIMARY KEY,
  username VARCHAR(30),
  lastname VARCHAR(30),
  firstname VARCHAR(30),
  password VARCHAR(120),
  UNIQUE(username)

);

CREATE TABLE data.roles
(
  id SERIAL PRIMARY KEY,
  rolename VARCHAR(30),
  UNIQUE(rolename)

);

CREATE TABLE data.rolesxusers
(
  idRole DECIMAL,
  idUser DECIMAL,

  PRIMARY KEY (idRole, idUser)
);

INSERT INTO data.users
  (username, lastname, firstname, password)
VALUES
  ('Shadows', 'Jasobson', 'Nicolas', 'nicolas'),
  ('Fablito', 'Brandl', 'Fabian', 'fabian'),
  ('Shan', 'Pessegue', 'Theo', 'theo');

INSERT INTO  data.roles
  (rolename)
VALUES
  ('ADMIN'),
  ('USER');

INSERT INTO data.rolesxusers
  (idRole, idUser)
VALUES
  (1, 1)


select *
from data.users;