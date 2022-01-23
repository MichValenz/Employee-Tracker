const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "gatosgatas31!",
    database: "empTracker",
  },
  console.log("Connected to the election database.")
);



//////// the query, GET, DELETE, and POST section////////
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});


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



// db.query(`DELETE FROM department WHERE id = ?`, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

/////////DEPARTMENT END/////////////////////



/////////ROLE///////////////////////////
app.get("/api/role", (req, res) => {
  const sql = `SELECT * FROM role`;

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
  const sql = `SELECT * FROM role WHERE id = ?`;
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

// Delete a candidate
db.query(`DELETE FROM ROLE WHERE id = ?`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

////////////ROLE END/////////////////////



///////////EMPLOYEE/////////////////////

app.get("/api/employee", (req, res) => {
  const sql = `SELECT * FROM employee`;

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
  const sql = `SELECT * FROM employee WHERE id = ?`;
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

const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
              VALUES (?,?,?,?,?)`;
const params = [1, "Sarak", "Key", 2, 2];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// db.query(`DELETE FROM employee WHERE id = ?`,(err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

////////////EMPLOYEE END/////////////////////




app.use((req, res) => {
  res.status(404).end();
});

////End of GET and POST section/////



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});