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
            "VIEW all departments",
            "VIEW all roles/jobs",
            "VIEW all employees by department",
            "VIEW all employees by manager id",
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

      case "VIEW all departments":
        viewAllDept();
        break;

      case "VIEW all roles/jobs":
        viewAllRole();
        break;

      case "VIEW all employees by department":
        viewEmpDept();
        break;

      case "VIEW all employees by manager id":
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


//Function for VIEWING ALL employees
function viewAll() {
    const query = "SELECT employee.first_name, employee.last_name, role.id, employee.manager_id FROM employee ORDER BY last_name ASC";

  connection.query(query, function(err, res) {
    if (err) throw err;
    else 
        console.table(res);
        selectAction();
    });
 };


 //Function for VIEWING ALL departments
function viewAllDept() {
  const query = "SELECT department.id, department.name FROM department ORDER BY id ASC";

connection.query(query, function(err, res) {
  if (err) throw err;
  else 
      console.table(res);
      selectAction();
  });
};


//Function for VIEWING ALL roles
function viewAllRole() {
  const query = "SELECT role.id, role.title, role.salary FROM role ORDER BY id ASC";

connection.query(query, function(err, res) {
  if (err) throw err;
  else 
      console.table(res);
      selectAction();
  });
};


//VIEW Employees BY department
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

    var query = "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id, "
    query += "FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department on (role.department_id = department.id) "
    query += "ORDER BY employee.manager_id";


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
        message: 'What role does this employee have?',
        choices: ['Sales Support', 'Account Manager', 'Sales Director',
        'Processor', 'Contracts Specialist', 'Finance Director',
        'Sys Admin', 'Developer', 'DBA', 'IT Director']
      }
    ])

    .then(function(answer) {
        
        var query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.first_name}', '${answer.last_name}', (SELECT id FROM role WHERE role.title = '${answer.role}'))`;

        connection.query(query, function(err, res) {
            if (err) throw err;
            else 
                console.log('Employee has been added!');
                viewAll();
                selectAction();
              });

    }); //end .then answer query

};//end AddEmp function



//Function for ADDING Department information to db
function addDept() {

  var query = "SELECT * FROM department";
  var departmentList = [];

  connection.query(query, function(err, res) {
      if (err) throw err;
      else 
          departmentList = res; 
        });

    inquirer
    .prompt([
      {
        name: 'dept_name',
        type: 'input',
        message: 'Enter NEW department name:',
      }
    ])
    .then (function(answer){
        var newDeptID = [(departmentList.length + 1) * 100];
        var query = `INSERT INTO department (id, name) VALUES ('${newDeptID}','${answer.dept_name}')`;

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
  
  var query = "SELECT * FROM role";
  var roleList = [];

  connection.query(query, function(err, res) {
      if (err) throw err;
      else 
          roleList = res;
        });

    inquirer
    .prompt([
      {
        name: 'role_title',
        type: 'input',
        message: 'Enter NEW job title / role name:',
      },
      {
        name: 'role_dept',
        type: 'list',
        message: 'Which department is this role in?',
        choices: ['Sales', 'Finance', 'IT']
      },
      {
        name: 'role_salary',
        type: 'input',
        message: 'Enter the salary for this job: (i.e: 40000, 60000, 90000, etc)',
      },
    ])
    .then(function(answer){
        var newRoleID = (roleList.length + 1);
        var query = `INSERT INTO role (id, title, salary, department_id) VALUES ('${newRoleID}', '${answer.role_title}', '${answer.role_salary}', (SELECT id FROM department WHERE department.name = '${answer.role_dept}'))`;
      

        connection.query(query, function(err, res) {
            if (err) throw err;
            else 
                console.log('New Role has been added!');
                selectAction();
              });
    });

};



//Function for UPDATING employees role in db

function updateEmpRole() {

    var query = "SELECT * FROM employee WHERE fullname = ?";
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




// function updateEmpMng() {

//       var query = "UPDATE employee SET employee.manager_name = 'Dan Danielson' WHERE employee.manager_id = 11";

  
//       var employeeList = [];
  
//       connection.query(query, function(err, res) {
//           if (err) throw err;
//           else 
//               employeeList = res;
//             });
  
//       inquirer
//       .prompt([
//         {
//           name: 'employee',
//           type: 'list',
//           message: "Which employee needs an updated manager?",
//           choices: employeeList
//         },
//         {
//             name: 'new_mng',
//             type: 'input',
//             message: "Who is the new manager?",
//           },
//       ])
//           .then(function(answer){
      
//               var query = `INSERT INTO employee (manager_name) VALUES ('${answer.new_mng}') WHERE employee.fullname = '${answer.employee}'`;
      
//               connection.query(query, function(err, res) {
//                   if (err) throw err;
//                   else 
//                       console.log('Manager has been added!');
//                       selectAction();
//                     });
//           });
//   };








