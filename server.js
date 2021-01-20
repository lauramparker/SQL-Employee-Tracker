//Dependencies
var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");
var tables = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wy@!!121415",
  database: "employees_db"
});

//Call the connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to the Employee Tracker!");

  selectAction(); //call first function
});


//function that lets user pick their action: VIEW, ADD, UPDATE or DELETE information
function selectAction() {

    return inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "VIEW all employees",
            "VIEW all employees by department",
            "VIEW all employees by manager",
            "ADD a NEW employee",
            "ADD a NEW department",
            "ADD a NEW job title / role",
            "UPDATE an employee's manager",
            "UPDATE an employee's role",
        ]
        })

    //Switch to 4 options: VIEW, ADD, UPDATE, DELETE
    .then(function(answer) {
      switch (answer.action) {
      case "VIEW all employees":
        viewAll();
        break;

      case "VIEW all employees by department":
        viewEmpDept();
        break;

      case "VIEW all employees by manager":
        viewEmpMng();
        break;

      case "ADD a NEW employee":
        addEmp();
        break;

      case "ADD a NEW department":
        addDept();
        break;

      case "ADD a NEW job title / role":
        addRole();
        break;

      case "UPDATE an employee's role":
        updateEmpRole();
        break;

      case "UPDATE an employee's manager":
        updateEmpMng();
        break;

    }; //end SWITCH
    }); //end .then

}; //end selectAction function


//Function for VIEWING ALL information in db
function viewAll() {
    const query = "SELECT * FROM employee ORDER BY last_name ASC";

  connection.query(query, function(err, res) {
    if (err) throw err;
    else 
        console.table(res);
        selectAction();
    });
    
 };


//VIEW by department
function viewEmpDept() {
    var query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name "
    query += "FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department on (role.department_id = department.id)";

  connection.query(query, function (err, res) {
    if (err) throw err;
    else
        console.table(res);    
        selectAction();
      });
     
};


//VIEW by manager 
function viewEmpMng() {
    var query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id, employee.manager_name "
    query += "FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department on (role.department_id = department.id) "
    query += "ORDER BY employee.manager_id";

            // UPDATE employee SET employee.manager_name = "Dan Danielson" WHERE employee.manager_id = 11;
            // UPDATE employee SET employee.manager_name = "Henri Hamilton" WHERE employee.manager_id = 21;
            // UPDATE employee SET employee.manager_name = "Lonny Littleton" WHERE employee.manager_id = 31;

  connection.query(query, function(err, res) {
    if (err) throw err;
    else 
        console.table(res)
        selectAction();
      });
    
};



//Function for ADDING Employee information to db
function addEmp() {

    inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Enter employee first name:',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Enter employee last name:',
      },
      {
        name: 'role',
        type: 'list',
        message: 'What job does this employee have?',
        choices: ['Sales Support', 'Account Manager', 'Sales Director',
        'Processor', 'Contracts Specialist', 'Finance Director',
        'Sys Admin', 'Developer', 'DBA', 'IT Director']
      },
    ])

    .then(function(answer) {
        
        var query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.first_name}', '${answer.last_name}', (SELECT id FROM role WHERE role.title = '${answer.role}'))`;

        connection.query(query, function(err, res) {
            if (err) throw err;
            else 
                console.log('Employee has been added!');
                selectAction();
              });

    }); //end .then answer query

};//end AddEmp function



//Function for ADDING Department information to db
function addDept() {

    inquirer
    .prompt([
      {
        name: 'dept_name',
        type: 'input',
        message: 'Enter NEW department name:',
      },
    ])
    .then(function(answer){

        var query = `INSERT INTO department (id, name) VALUES (1200,'${answer.dept_name}')`;

        connection.query(query, function(err, res) {
            if (err) throw err;
            else 
                console.log('Department has been added!');
                selectAction();
              });
    });
};


//Function for ADDING new job / role information to db
function addRole() {

    inquirer
    .prompt([
      {
        name: 'role_name',
        type: 'input',
        message: 'Enter NEW job title / role name:',
      },
    ])
    .then(function(answer){

        var query = `INSERT INTO role (id, title) VALUES (50, '${answer.role_title}')`;

        connection.query(query, function(err, res) {
            if (err) throw err;
            else 
                console.log('New Role has been added!');
                selectAction();
              });
    });
};



//Function for UPDATING employees role in db
// function updateAll() {

function updateEmpRole() {

    var query = 'SELECT * FROM employee WHERE fullname = ?';

    var employeeList = [];

    connection.query(query, function(err, res) {
        if (err) throw err;
        else 
            employeeList = res;
          });

    inquirer
    .prompt([
      {
        name: 'employee',
        type: 'list',
        message: "Which employee's role needs updating?",
        choices: employeeList
      },
      {
        name: 'new_roleID',
        type: 'input',
        message: "Enter their NEW role id:",
      },

    ])
        .then(function(answer){
    
            var query = `UPDATE employee SET role_id = ('${answer.newroleID}') WHERE employee.fullname = '${answer.employee}'`;
    
            connection.query(query, function(err, res) {
                if (err) throw err;
                else 
                    console.log('Employee Role has been added!');
                    selectAction();
                  });
        });
};


function updateEmpMng() {

      var query = 'SELECT * FROM employee WHERE fullname = ?';
  
      var employeeList = [];
  
      connection.query(query, function(err, res) {
          if (err) throw err;
          else 
              employeeList = res;
            });
  
      inquirer
      .prompt([
        {
          name: 'employee',
          type: 'list',
          message: "Which employee needs an updated manager?",
          choices: employeeList
        },
        {
            name: 'new_mng',
            type: 'input',
            message: "Who is the new manager?",
          },
      ])
          .then(function(answer){
      
              var query = `INSERT INTO employee (manager_name) VALUES ('${answer.new_mng}') WHERE employee.fullname = '${answer.employee}'`;
      
              connection.query(query, function(err, res) {
                  if (err) throw err;
                  else 
                      console.log('Manager has been added!');
                      selectAction();
                    });
          });
  };








