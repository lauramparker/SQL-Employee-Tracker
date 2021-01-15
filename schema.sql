DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

USE employees_db;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL,
    PRIMARY KEY(id),
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    deapartment_id INT NOT NULL
);

CREATE TABLE department (
    id INT NOT NULL,
    PRIMARY KEY(id),
    name VARCHAR(30)
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;
  
