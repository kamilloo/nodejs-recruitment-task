CREATE TABLE IF NOT EXISTS movies (
      id int NOT NULL AUTO_INCREMENT,
      title varchar(255),
      genre varchar(255),
      released date DEFAULT NULL,
      director varchar(255),
      userId int,
      created_at TIMESTAMP NOT NULL,
      PRIMARY KEY (id)
);
