const mysql = require("mysql2");

const dbConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employeedata",
});

module.exports = dbConnect;
