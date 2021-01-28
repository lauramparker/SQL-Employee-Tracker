DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

USE employees_db;

CREATE TABLE employee (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    fullname VARCHAR(61) GENERATED ALWAYS AS (CONCAT(first_name,' ',last_name)) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    manager_name VARCHAR(61),
    id INT auto_increment NOT NULL,
    PRIMARY KEY(id)

);


CREATE TABLE role (
    id INT NOT NULL,
    PRIMARY KEY (id),
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES employee (role_id),
);

CREATE TABLE department (
    id INT NOT NULL,
    PRIMARY KEY (id),
    name VARCHAR(30),
    FOREIGN KEY (id) REFERENCES role (department_id),
 
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;
  
