const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");
const employeeData = require("./routes/employee.route");
const app = express();
const PORT = 5000;

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected");
});

app.use(bodyParser.json());
app.use(cors());

app.use("/", employeeData);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
