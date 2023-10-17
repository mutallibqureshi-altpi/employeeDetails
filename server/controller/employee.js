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
    }
  );

  let empId;
  db.query("SELECT * FROM employeemaster", (err, res) => {
    if (err) throw err;
    else {
      empId = res.at(-1).id;
      db.query(
        "INSERT INTO rolemaster (role, empId) VALUES (?, ?)",
        [role_id, empId],
        (err, res) => {
          if (err) throw err;
        }
      );
    }
  });
  let desId;
  db.query("SELECT * FROM employeemaster", (err, res) => {
    if (err) throw err;
    else {
      desId = res.at(-1).id;
      db.query(
        "INSERT INTO designationmaster (designation, desId) VALUES (?, ?)",
        [designation_id, desId],
        (err, res) => {
          if (err) throw err;
        }
      );
    }
  });
  let cateId;
  db.query("SELECT * FROM employeemaster", (err, res) => {
    if (err) throw err;
    else {
      cateId = res.at(-1).id;
      db.query(
        "INSERT INTO categorymaster (category, cateId) VALUES (?, ?)",
        [category_id, cateId],
        (err, res) => {
          if (err) throw err;
        }
      );
    }
  });

  res.status(201).json({ message: "Created User" });
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
  db.query("DELETE FROM rolemaster WHERE empId=?", [id], (err, result) => {
    if (err) throw err;
    db.query(
      "DELETE FROM categorymaster WHERE cateId=?",
      [id],
      (err, result) => {
        if (err) throw err;
        db.query(
          "DELETE FROM designationmaster WHERE desId=?",
          [id],
          (err, result) => {
            if (err) throw err;
            db.query(
              "DELETE FROM employeemaster WHERE id=?",
              [id],
              (err, result) => {
                if (err) throw err;
                res.status(200).json({ message: "User deleted successfully." });
                console.log("data deleted");
              }
            );
          }
        );
      }
    );
  });
};

module.exports = { getUser, postUser, updateUser, deleteUser };
