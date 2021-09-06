CREATE DATABASE development_proof;

USE development_proof;

-- TABLE ROLES
CREATE TABLE roles(
    id INT(11) NOT NULL,
    name VARCHAR(40) NOT NULL,
    description TEXT NOT NULL
);

ALTER TABLE roles
    ADD PRIMARY KEY (id);

ALTER TABLE roles
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;  

DESCRIBE roles;

-- INSERT ROLE SPEAKER
INSERT INTO roles (name, description) VALUES ('speaker', 'The Speaker can create “conferences” so that the “attendants” can sign up to
they. "Conference" must have name, date, location, quota, and state. The Speaker can
activate or deactivate a conference. Note: You cannot deactivate a conference if you already
has registered attendants.');

--INSERT ROLE ATTENDANT
INSERT INTO roles (name, description) VALUES ('attendant', 'The Attendant can register for a “conference” as long as it has a “quota”
available.');

-- TABLE USERS

CREATE TABLE users(
    id INT(11) NOT NULL,
    email VARCHAR(150) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(200)
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

-- TABLE USERS_ROLES
CREATE TABLE users_roles(
    id INT(11) NOT NULL,
    role_id INT(11),
    user_id INT(11),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE users_roles
    ADD PRIMARY KEY (id);

ALTER TABLE users_roles
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users_roles;

-- TABLE CONFERENCES
CREATE TABLE conferences(
    id INT(11) NOT NULL,
    name VARCHAR(150) NOT NULL,
    date DATETIME NOT NULL,
    location VARCHAR(180) NOT NULL,
    quota INT(11) NOT NULL,
    state BOOLEAN NOT NULL
);

ALTER TABLE conferences
    ADD PRIMARY KEY (id);

ALTER TABLE conferences
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE conferences;

-- TABLE CONFERENCES_SPEAKERS
CREATE TABLE conferences_speakers(
    id INT(11) NOT NULL,
    conference_id INT(11) NOT NULL,
    user_id INT(11) NOT NULL,
    FOREIGN KEY (conference_id) REFERENCES conferences(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE conferences_speakers
    ADD PRIMARY KEY (id);

ALTER TABLE conferences_speakers
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE conferences_speakers;

-- TABLE CONFERENCES_ATTENDANTS
CREATE TABLE conferences_attendants(
    id INT(11) NOT NULL,
    conference_id INT(11) NOT NULL,
    user_id INT(11) NOT NULL,
    FOREIGN KEY (conference_id) REFERENCES conferences(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE conferences_attendants
    ADD PRIMARY KEY (id);

ALTER TABLE conferences_attendants
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE conferences_attendants;