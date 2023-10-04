const db = require("../config/db");

const getUser = (req, res) => {
  const sql = "SELECT *";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("READ");
  });
};
const postUser = () => {};
const updateUser = () => {};
const deleteUser = () => {};

module.exports = { getUser, postUser, updateUser, deleteUser };
