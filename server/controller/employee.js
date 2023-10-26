const db = require("../config/db");

//main-page
const getUser = async (req, res) => {
  const users = [];
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT * from employeemaster", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    for (const curr of result) {
      const roleResult = await new Promise((resolve, reject) => {
        db.query(
          `SELECT role from rolemaster where id = ${curr.role_id}`,
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
      });

      const designationResult = await new Promise((resolve, reject) => {
        db.query(
          `SELECT designation from designationmaster where id = ${curr.designation_id}`,
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
      });

      const categoryResult = await new Promise((resolve, reject) => {
        db.query(
          `SELECT category from categorymaster where id = ${curr.category_id}`,
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          }
        );
      });

      const role = roleResult[0].role;
      const designation = designationResult[0].designation;
      const category = categoryResult[0].category;

      const user = {
        id: curr.id,
        firstname: curr.firstname,
        lastname: curr.lastname,
        role_id: role,
        designation_id: designation,
        category_id: category,
      };

      users.push(user);
    }

    res.status(201).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
};

const postUser = (req, res) => {
  const { firstName, lastName, address, role_id, designation_id, category_id } =
    req.body;
  console.log(req.body);
  if (!firstName || !lastName) {
    res.status(400).send("This is required");
    return;
  }

  db.query(
    "INSERT INTO employeemaster (firstname, lastname, address, role_id, designation_id, category_id) VALUES (?,?,?,?,?,?)",
    [firstName, lastName, address, role_id, designation_id, category_id],
    (err, result) => {
      if (err) throw err.message;
      console.log("Data added");
    }
  );
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
  db.query("DELETE FROM employeemaster WHERE id=?", [id], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: "User deleted successfully." });
    console.log("data deleted");
  });
};

//role-section
const getRole = (req, res) => {
  db.query("SELECT * FROM rolemaster", (err, result) => {
    if (err) throw err;
    res.status(201).send(result);
    console.log("read");
  });
};

const postRole = (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.send(400).send("This is required");
  }
  db.query(
    "INSERT INTO rolemaster (role) VALUES (?)",
    [role],
    (err, result) => {
      if (err) throw err;
      console.log("role");
      res.send(result);
    }
  );
};
const updateRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  db.query(
    "UPDATE rolemaster SET role=? WHERE id =?",
    [role, id],
    (err, result) => {
      if (err) throw err;
      console.log("role updated");
      res.status(201).send(result);
    }
  );
};
const deleteRole = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM rolemaster WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    console.log("Role deleted");
    res.send(result);
  });
};

//designation-section
const getDesignation = (req, res) => {
  db.query("SELECT * FROM designationmaster", (err, result) => {
    if (err) throw err;
    res.status(201).send(result);
    console.log("read");
  });
};
const postDesignation = (req, res) => {
  const { designation } = req.body;
  if (!designation) {
    return res.send(400).send("This is required");
  }
  db.query(
    "INSERT INTO designationmaster (designation) VALUES (?)",
    [designation],
    (err, result) => {
      if (err) throw err;
      console.log("designation");
      res.send(result);
    }
  );
};
const updateDesignation = (req, res) => {
  const { id } = req.params;
  const { designation } = req.body;
  db.query(
    "UPDATE designationmaster SET designation=? WHERE id=?",
    [designation, id],
    (err, result) => {
      if (err) throw err;
      console.log("designation updated");
      res.status(201).send(result);
    }
  );
};

const deleteDesignation = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM designationmaster WHERE id =?", [id], (err, result) => {
    if (err) throw err;
    console.log("designation deleted");
    res.status(201).send(result);
  });
};

//category-section
const getCategory = (req, res) => {
  db.query("SELECT * FROM categorymaster", (err, result) => {
    if (err) throw err;
    res.status(201).send(result);
    console.log("read");
  });
};
const postCategory = (req, res) => {
  const { category } = req.body;
  if (!category) {
    return res.send(400).send("This is required");
  }
  db.query(
    "INSERT INTO categorymaster (category) VALUES (?)",
    [category],
    (err, result) => {
      if (err) throw err;
      console.log("category");
      res.send(result);
    }
  );
};
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  db.query(
    "UPDATE categorymaster SET category=? WHERE id=?",
    [category, id],
    (err, result) => {
      if (err) throw err;
      console.log("Category updated");
      res.status(201).send(result);
    }
  );
};
const deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM categorymaster WHERE id=?", [id], (err, result) => {
    if (err) throw err;
    console.log("category deleted");
    res.status(201).send(result);
  });
};

module.exports = {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  getRole,
  postRole,
  updateRole,
  deleteRole,
  getDesignation,
  postDesignation,
  updateDesignation,
  deleteDesignation,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};
