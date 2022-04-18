--
-- Table structure for table Users
--


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  username varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  isAdmin boolean NOT NULL DEFAULT false,
  createdAt timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

--
-- Table structure for table Posts
--


CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  userId int NOT NULL,
  content text,
  attachement varchar(255) DEFAULT NULL,
  createdAt timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  CONSTRAINT posts_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id)
) ;
