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
          case "View all roles":
            viewRoles();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Add a role":
            addRole();
            break;
          case "Add an employee":
            addEmployee();
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
      console.table(departments)
      actionPrompt();
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
      `SELECT employee.id, employee.first_name,employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`
    )
    .then(([rows]) => {
      let employees = rows;

      console.table(employees);
      actionPrompt();
    });

}


function viewRoles() {
  db.promise()
    .query(
      `SELECT role.*, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id`
    )
    .then(([rows]) => {
      let roles = rows;

      console.table(roles);
      actionPrompt();
    });
}
 

function addDepartment() {

  inquirer.prompt({
    type: "input",
    name: "depName",
    message: "What department would you like to add?",
    validate: (depName) => {
      if (depName) {
        return true;
      } else {
        console.log("Please enter a department name.");
        return false;
      }
    }
  })
.then(answer => {
  const sql = `INSERT INTO department (name)
                  VALUES (?)`;
  db.query(sql, answer.depName, (err, res) => {
        if (err) throw err;
    console.log("Department has been added");
      actionPrompt();
      
      
    });
})

};

function addRole() {

  inquirer.prompt([
    {
    type: "input",
    name: "title",
    message: "What is the role's title?",
    validate: (title) => {
      if (title) {
        return true;
      } else {
        console.log("Please enter a tile.");
        return false;
      }
    }
  },
  {
  type: "input",
  name: "salary",
  message: "Enter the job role's salary",
  validate: (salary) => {
    if (salary) {
      return true;
    } else {
      console.log("Please enter salary.");
      return false;
    }
   }
  },
])
.then(answers => {
  const params = [answers.title, answers.salary];


  const depSql = "SELECT name, id FROM department";

  db.promise().query(depSql, (err, res) => {
        if (err) throw err;
  
    let empDept = data.map(({ name, id}) => ({ name: name, value: id }));
      
    });

    inquirer.prompt({
      type: "list",
      name: "empDept",
      message: "Enter the role's department?",
      choices: empDept
    })
})

.then(answer => {
  const dept = answer.dept; 
  params.push(dept);
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

  db.query(sql, params, (err, result) => {
    if (err) throw err;
    
    viewRoles();
  })
})
};
 






actionPrompt();
