const db = require("../config/db");

const getUser = (req, res) => {
  const sql = "SELECT * from employeemaster";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("read");
    res.send(result);
  });
};
const postUser = (req, res) => {
  const { firstName, lastName, role, designation, category } = req.body;
  console.log(req.body);
  if (!firstName || !lastName) {
    res.status(400).send("This is required");
    return;
  }

  db.query(
    "INSERT INTO employeemaster (firstname, lastname,role_id, designation_id, category_id) VALUES (?,?,?,?,?)",
    [firstName, lastName, role, designation, category],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Data added");
        res.status(201).send(result);
      }
    }
  );
};

const updateUser = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE employeedata SET role = ? WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};
const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employeemaster WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    } else {
      res.status(200).json({ message: "User deleted successfully." });
      console.log(result);
    }
  });
};

module.exports = { getUser, postUser, updateUser, deleteUser };
