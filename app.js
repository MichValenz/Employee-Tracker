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
          case "Update an employee role":
            editEmployee();
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
    
      console.table(departments)
      actionPrompt();
  })

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
    validate: (depNameInput) => {
      if (depNameInput) {
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
      viewDepartments();
      
      
    });
})

};

function addRole() {

  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's title?",
        validate: (titleInput) => {
          if (titleInput) {
            return true;
          } else {
            console.log("Please enter a title.");
            return false;
          }
        },
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
        },
      },
    ])
    .then(answers => {
      const params = [answers.title, answers.salary];

      const depSql = "SELECT name, id FROM department";

      db.query(depSql, (err, res) => {
        if (err) throw err;

        const empDept = res.map(({ name, id }) => ({ name: name, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "empDept",
              message: "Enter the role's department?",
              choices: empDept,
              validate: (empDeptInput) => {
                if (empDeptInput) {
                  return true;
                } else {
                  console.log("Please select department.");
                }
              },
            },
          ])

          .then((answer) => {
            const empDept = answer.empDept;
            params.push(empDept);
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

            db.query(sql, params, (err, result) => {
              if (err) throw err;

              viewRoles();
            });
          });
      });
    });
  }




function addEmployee(){
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter employee's first name.",
        validate: (first_name_input) => {
          if (first_name_input) {
            return true;
          } else {
            console.log("Please enter a first name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name.",
        validate: (last_name_input) => {
          if (last_name_input) {
            return true;
          } else {
            console.log("Please enter a last name.");
            return false;
          }
        },
      },
    ])

    .then(answers => {
      const params = [answers.first_name, answers.last_name]

      const sql = "SELECT role.id, role.title FROM role";
      db.query(sql, (err, res) => {
        if (err) throw err;

        const empRole = res.map(({id, title}) => ({ name: title, value: id}));
        
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "Select the employee's role:",
              choices: empRole,
              validate: (roleInput) => {
                if (roleInput) {
                  return true;
                } else {
                  console.log("Please select a job role.");
                }
              },
            },
          ])

          .then((answer) => {
            const empRole = answer.role;
            params.push(empRole);

            const mgmSql = "SELECT * FROM employee";

            db.query(mgmSql, (err, res) => {
              if (err) throw err;

              const managerOptions = res.map(
                ({ id, first_name, last_name }) => ({
                  name: first_name + " " + last_name,
                  value: id,
                })
              );

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "empManager",
                    message: "Choose the employee's manager:",
                    choices: managerOptions,
                    validate: (managerInput) => {
                      if (managerInput) {
                        return true;
                      } else {
                        console.log("Please select manager.");
                      }
                    },
                  },
                ])

                .then((answer) => {
                  console.log(answer);
                  const manager = answer.empManager;
                  params.push(manager);

                  const empMgSql =
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";

                  db.query(empMgSql, params, (err, response) => {
                    if (err) throw err;

                    viewEmployees();
                  });
                });
            });
          });
      })
    })
};

function editEmployee() {

  const empSql = "SELECT * FROM employee";

  db.query(empSql, (err, res) => {
    if (err) throw err;

    const empOptions = res.map(({ id, first_name, last_name}) => ({ name: first_name + " "+ last_name, value: id}));

  inquirer
    .prompt([
      {
        type: "list",
        name: "editEmp",
        message: "Select the employee you'd like to update:",
        choices: empOptions,
        validate: (editInput) => {
          if (editInput) {
            return true;
          } else {
            console.log("Please select employee.");
          }
        },
      },
    ])

    .then((answer) => {
      const chosenEmp = answer.editEmp;
      const params = [];
      params.push(chosenEmp);

      const roleSql = "SELECT * FROM role";
      db.query(roleSql, (err, res) => {
        if (err) throw err;

        const roles = res.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "Select new role:",
              choices: roles,
              validate: (roleInput) => {
                if (roleInput) {
                  return true;
                } else {
                  console.log("Please select role.");
                }
              },
            },
          ])
          .then((answer) => {
            const role = answer.role;
            params.push(role);

            let updatedEmp = params[0];
            params[0] = role;
            params[1] = updatedEmp;

            const updatedSql = "UPDATE employee SET role_id = ? WHERE id = ?";
            db.query(updatedSql, params, (err, res) => {
              if (err) throw err;

              viewEmployees();
            });
          });

          
      });
    });

  })



}



actionPrompt();
