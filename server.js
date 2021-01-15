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
  console.log("Connection established");

  selectAction(); //call first function
});


//function that lets user pick their action: VIEW, ADD, UPDATE or DELETE information
function selectAction() {

inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "VIEW Departments, Employees, & Roles",
        "ADD Departments, Employees, & Roles",
        "UPDATE Departments, Employees, & Roles",
        "DELETE Departments, Employees, & Roles",
      ]
    })
    //Switch to 4 options: VIEW, ADD, UPDATE, DELETE
    .then(function(answer) {
      switch (answer.action) {
      case "VIEW Departments, Employees, & Roles":
        viewAll();
        break;

      case "ADD Departments, Employees, & Roles":
        addAll();
        break;

      case "UPDATE Departments, Employees, & Roles":
        updateAll();
        break;

      case "DELETE Departments, Employees, & Roles":
        deleteAll();
        break;

}; //end selectAction function






    connection.end();