const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");
const postValidation = require("./utils/postValidation");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "gatosgatas31!",
    database: "empTracker",
  },
  console.log("Connected to the employee1 database.")
);



//////// the query, GET, DELETE, and POST section////////


/////////DEPARTMENT///////////////
app.get("/api/department", (req, res) => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/department/:id", (req, res) => {
  const sql = `SELECT * FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});



app.delete("/api/department/:id", (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Department not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

app.post("/api/department", ({ body }, res) => {
  const errors = postValidation(
    body,
    "name"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

    const sql = `INSERT INTO department (name)
  VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });

});


/////////DEPARTMENT END/////////////////////



/////////ROLE///////////////////////////
app.get("/api/role", (req, res) => {
  const sql = `SELECT role.*, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/role/:id", (req, res) => {
  const sql = `SELECT role.*, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id WHERE role.id = ?`;

  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

app.delete("/api/role/:id", (req, res) => {
  const sql = `DELETE FROM role WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Role not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

app.post("/api/role", ({ body }, res) => {
  const errors = postValidation(body, "title", "salary", "department_id"
);
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO role (title, salary, department_id)
  VALUES (?,?,?)`;
  const params = [body.title, body.salary, body.department_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

////////////ROLE END/////////////////////



///////////EMPLOYEE/////////////////////

app.get("/api/employee", (req, res) => {
  const sql = `SELECT employee.*, role.title AS job_title FROM employee LEFT JOIN role ON employee.role_id = role.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/employee/:id", (req, res) => {
  const sql = `SELECT employee.*, role.title AS job_role FROM employee LEFT JOIN role ON employee.role_id = role.id WHERE employee.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});



app.delete("/api/employee/:id", (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});


app.post("/api/employee", ({ body }, res) => {
  const errors = postValidation(body, "first_name", "last_name", "role_id", "manager_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

app.put("/api/employee/:id", (req, res) => {
const errors = postValidation(req.body, "role_id");

if (errors) {
  res.status(400).json({ error: errors });
  return;
}

  const sql = `UPDATE employee SET role_id = ? 
               WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
  
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});



////////////EMPLOYEE END/////////////////////




app.use((req, res) => {
  res.status(404).end();
});

////End of GET and POST section/////







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});