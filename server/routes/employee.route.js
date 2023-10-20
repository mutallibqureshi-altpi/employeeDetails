const router = require("express").Router();
const {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  getRole,
  getDesignation,
  getCategory,
  postDesignation,
  postRole,
  postCategory,
} = require("../controller/employee");

router.get("/", getUser);
router.post("/", postUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/getrole", getRole);
router.post("/getrole", postRole);
router.get("/getdesignation", getDesignation);
router.post("/getdesignation", postDesignation);
router.get("/getcategory", getCategory);
router.post("/getcategory", postCategory);

module.exports = router;
