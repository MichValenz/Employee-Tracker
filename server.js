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



/// the query, GET and POST section/////
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});


db.query(`SELECT * FROM department`, (err, rows) => {
  console.log(rows);
});

db.query(`SELECT * FROM role`, (err, rows) => {
  console.log(rows);
});

db.query(`SELECT * FROM employee`, (err, rows) => {
  console.log(rows);
});


app.use((req, res) => {
  res.status(404).end();
});

////End of GET and POST section/////



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});