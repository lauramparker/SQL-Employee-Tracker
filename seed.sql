USE employees_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Alex', 'Anderson', 40, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Bob', 'Barker', 30, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Cole', 'Collins', 20, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Dan', 'Danielson', 10, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Emily', 'Everett', 40, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Fred', 'Franklin', 30, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('George', 'Gimmelson', 20, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Henri', 'Hamilton', 10, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Isla', 'Iverson', 40, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Jenny', 'Johnson', 30, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Kenzie', 'King', 20, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Lonny', 'Littleton', 10, 4);

INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Support', 40000, 'Sales', 100);

INSERT INTO role (title, salary, department_id) 
VALUES ('Account Manager', 60000, 'Sales', 100);

INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Director', 80000, 'Sales', 100);

INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Manager', 100000, 'Sales', 100);

INSERT INTO role (title, salary, department_id) 
VALUES ('Processor', 40000, 'Finance', 200);

INSERT INTO role (title, salary, department_id) 
VALUES ('Accounts Payable', 50000, 'Finance', 200);

INSERT INTO role (title, salary, department_id) 
VALUES ('Contracts Specialist', 80000, 'Finance', 200);

INSERT INTO role (title, salary, department_id) 
VALUES ('Accountant', 100000, 'Finance', 200);

INSERT INTO role (title, salary, department_id) 
VALUES ('Sys Admin', 70000, 'IT', 300);

INSERT INTO role (title, salary, department_id) 
VALUES ('Developer', 90000, 'IT', 300);

INSERT INTO role (title, salary, department_id) 
VALUES ('DBA', 100000, 'IT', 300);

INSERT INTO role (title, salary, department_id) 
VALUES ('Help Desk Manager', 100000, 'IT', 300);