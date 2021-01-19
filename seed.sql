INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Alex', 'Anderson', 101, 11);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Bob', 'Barker', 102, 11);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Cole', 'Collins', 102, 11);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Dan', 'Danielson', 103, 15);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Emily', 'Everett', 201, 21);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Fred', 'Franklin', 202, 21);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('George', 'Gimmelson', 202, 21);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Henri', 'Hamilton', 203, 25);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Isla', 'Iverson', 301, 31);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Jenny', 'Johnson', 302, 31);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Kenzie', 'King', 303, 31);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Lonny', 'Littleton', 304, 35);

INSERT INTO role (title, salary, id, department_id) 
VALUES ('Sales Support', 40000, 101, 100);

INSERT INTO role (title, salary, id, department_id) 
VALUES ('Account Manager', 60000, 102, 100);

INSERT INTO role (title, salary, id, department_id) 
VALUES ('Sales Director', 80000, 103, 100);

INSERT INTO role (title, salary, id, department_id) 
VALUES ('Processor', 40000, 201, 200);

INSERT INTO role (title, salary, id, department_id)
VALUES ('Contracts Specialist', 80000, 202, 200);

INSERT INTO role (title, salary, id, department_id)
VALUES ('Finance Director', 120000, 203, 200);

INSERT INTO role (title, salary, id, department_id) 
VALUES ('Sys Admin', 70000, 301, 300);

INSERT INTO role (title, salary, id, department_id)
VALUES ('Developer', 90000, 302, 300);

INSERT INTO role (title, salary, id, department_id) 
VALUES ('DBA', 100000, 303, 300);

INSERT INTO role (title, salary, id, department_id) 
VALUES ('IT Director', 120000, 304, 300);

INSERT INTO department (id, name)
VALUES (100, 'Sales');

INSERT INTO department (id, name)
VALUES (200, 'Finance');

INSERT INTO department (id, name)
VALUES (300, 'IT');