const router = require("express").Router();
const {
  getUser,
  postUser,
  updateUser,
  deleteUser,
} = require("../controller/employee");

router.get("/", getUser);
router.post("/", postUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
