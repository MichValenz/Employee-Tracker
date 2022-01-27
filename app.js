const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require('mysql2');
require("console.table")


const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "gatosgatas31!",
    database: "empTracker",
  },
  console.log("Connected to the employee tracker database.")

);



function actionPrompt() {

    inquirer
      .prompt({
        type: "list",
        name: "chooseAction",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all employees",
          "View all roles",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Cancel",
        ],
        validate: (actionInput) => {
          if (actionInput) {
            return true;
          } else {
            console.log("Please select what you would like to do.");
          }
        },
      })
      .then(function (action) {
        switch (action.chooseAction) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Cancel":
            cancelTracker();
            break;
          default:
            break;
        }
      });
}


function viewDepartments(){

  db.promise().query("Select * FROM department")
  .then(([rows]) => {
    let departments = rows 
    
    // const departmentOptions = departments.map(department => 
      console.table(rows)
  })
    // let depSearch = "Select * FROM department";
    
    // db.depSearch(depSearch, function(err, res) {
    //     if(err)throw err;
    //     console.table("You're viewing all departments", res)
    // })
}



function viewEmployees() {
  db.promise()
    .query(
      `SELECT employee.*, role.title AS job_title FROM employee LEFT JOIN role ON employee.role_id = role.id`)
    .then(([rows]) => {
      let departments = rows;

      // const departmentOptions = departments.map(department =>
      console.table(rows);
    });
  // let depSearch = "Select * FROM department";

  // db.depSearch(depSearch, function(err, res) {
  //     if(err)throw err;
  //     console.table("You're viewing all departments", res)
  // })
}
 







actionPrompt();
