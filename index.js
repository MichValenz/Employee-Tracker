const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require('mysql');

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
          case "view all departments":
            viewDepartments();
            break;
          case "Cancel":
            cancelTracker();
          default:
            break;
        }
      });
}









