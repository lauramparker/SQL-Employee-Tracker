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
            "ADD a new employee",
            "UPDATE an employee's manager",
            "UPDATE an employee's role",
            "DELETE an employee",
            "DELELE all the employees in a department"
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

      case "ADD a new employee":
        addEmp();
        break;

      case "UPDATE an employee's role":
        updateEmpRole();
        break;

      case "UPDATE an employee's manager":
        updateEmpMng();
        break;

      case "DELETE all the employees in a department":
        deleteAll();
        break;

    }; //end SWITCH

}); //end selectAction function  ?????


//Function for VIEWING ALL information in db
async function viewAll() {
    var query = "SELECT * FROM employee ORDER BY last_name ASC";

  connection.query(query, function(err, res) {
    if (err) throw err;
    else console.table(res)
    }),
    await selectAction();
  };


//VIEW by department //Utilize LEFT Join??? in case there are employees not assigned to a department
async function viewEmpDept() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.id, role.department_id, department.id, department.name";
    query += "FROM employee Inner JOIN department ON (employee.role_id = role.id AND role_department.id = department.id)"
    
  connection.query(query, function(err, res) {
    if (err) throw err;
    else console.table(res)
    }),
    await selectAction();
  };



//VIEW by manager 
async function viewEmpMng() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.id, role.title";
    query += "FROM employee INNER JOIN role ON (employee.role_id = role.id) ORDER BY employee.manager_id"
    // !! Need to identify WHO the manager is for each group.
  connection.query(query, function(err, res) {
    if (err) throw err;
    else console.table(res)
    }),
    await selectAction();
  };




//Function for ADDING information to db
// function addEmp() {
//     let deptChoices = "SELECT"
//     let roleChoices = "SELECT";

//     inquirer
//     .prompt(
//       {
//         name: 'first_name',
//         type: 'input',
//         message: 'Enter employee first name:',
//       },
//       {
//         name: 'last_name',
//         type: 'input',
//         message: 'Enter employee last name:',
//       },
//       {
//         name: 'department',
//         type: 'list',
//         message: 'What department is this employee in?',
//         choices: ['Sales',  'Engineering', 'Finance', 'Legal']
//       },
  
//       {
//         name: 'role_title',
//         type: 'list',
//         message: 'What role do they have?',
//         choices: []
//       },

//       })
//     .then(function(answer) {
//       var query = 

// };


// //Function for UPDATING information to db
// function updateAll() {


// };


// //Function for DELETING information to db
// function viewAll() {


// };




 //   connection.end();
};