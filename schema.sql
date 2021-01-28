DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

USE employees_db;

CREATE TABLE department(
    id INT NOT NULL,
    PRIMARY KEY(id),
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT NOT NULL,
    PRIMARY KEY(id),
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT auto_increment NOT NULL,
    PRIMARY KEY(id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    fullname VARCHAR(61) GENERATED ALWAYS AS (CONCAT (first_name,' ',last_name)) NOT NULL,
    manager_id INT,
        CONSTRAINT fk_manager
        FOREIGN KEY(manager_id) REFERENCES role(id), 
    manager_name VARCHAR(61),
    role_id INT NOT NULL,
        CONSTRAINT fk_role
        FOREIGN KEY(role_id) REFERENCES role(id) 
);












