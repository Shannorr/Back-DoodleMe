DROP TABLE data.favoris;
DROP TABLE data.reponses;
DROP TABLE data.creneau;
DROP TABLE data.events;
DROP TABLE data.users;

CREATE TABLE data.users
(
  idUser SERIAL PRIMARY KEY,
  username VARCHAR(30),
  lastname VARCHAR(30),
  firstname VARCHAR(30),
  password VARCHAR(120),
  UNIQUE(username)

);

CREATE TABLE data.events
(
  idEvent SERIAL PRIMARY KEY,
  name VARCHAR(30),
  description VARCHAR(120),
  cloture boolean,
  idcreator INTEGER,
  unique(name),
  CONSTRAINT fk_events_idUser FOREIGN KEY (idcreator) REFERENCES data.users(idUser)
);

CREATE TABLE data.creneau
(
  idCreneau SERIAL,
  date VARCHAR(30),
  heureDebut VARCHAR(30),
  nbRepPositive INTEGER,
  idEvent INTEGER,
  PRIMARY KEY (idCreneau),
  CONSTRAINT fk_creneau_idEvent FOREIGN KEY (idEvent) REFERENCES data.events(idEvent)
);

CREATE TABLE data.favoris
(
  idEvent INTEGER,
  idUser INTEGER,
  PRIMARY KEY(idEvent, idUser),
  CONSTRAINT fk_favoris_idUser FOREIGN KEY (idUser) REFERENCES data.users(idUser),
  CONSTRAINT fk_favoris_idEvent FOREIGN KEY (idEvent) REFERENCES data.events(idEvent)
);

CREATE TABLE data.reponses
(
  idCreneau INTEGER,
  idUser INTEGER,
  reponse boolean,
  PRIMARY KEY(idCreneau, idUser),
  CONSTRAINT fk_reponses_idUser FOREIGN KEY (idUser) REFERENCES data.users(idUser),
  CONSTRAINT fk_reponses_idCreneau FOREIGN KEY (idCreneau) REFERENCES data.creneau(idCreneau)
);