const db = require("../config/db");

const getUser = (req, res) => {
  db.query("SELECT * from employeemaster", (err, result) => {
    if (err) throw err;
    console.log("read");
    res.status(201).send(result);
  });
};
const postUser = (req, res) => {
  const { firstName, lastName, role_id, designation_id, category_id } =
    req.body;
  if (!firstName || !lastName) {
    res.status(400).send("This is required");
    return;
  }

  db.query(
    "INSERT INTO employeemaster (firstname, lastname,role_id, designation_id, category_id) VALUES (?,?,?,?,?)",
    [firstName, lastName, role_id, designation_id, category_id],
    (err, result) => {
      if (err) throw err;
      console.log("Data added");
      res.status(201).send(result);
    }
  );
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, role_id, designation_id, category_id } =
    req.body;
  db.query(
    "UPDATE employeemaster SET firstname=?, lastname = ?, role_id =?, designation_id=?, category_id = ? WHERE id = ?",
    [firstname, lastname, role_id, designation_id, category_id, id],
    (err, result) => {
      if (err) throw err.message;
      console.log("data updated");
      res.status(201).send(result);
    }
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employeemaster WHERE id=?", [id], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: "User deleted successfully." });
    console.log("data deleted");
  });
};

module.exports = { getUser, postUser, updateUser, deleteUser };
