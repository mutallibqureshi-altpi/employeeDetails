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
  deleteRole,
  updateRole,
  updateDesignation,
  deleteDesignation,
  updateCategory,
  deleteCategory,
} = require("../controller/employee");

// main-page
router.get("/", getUser);
router.post("/", postUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// role-section
router.get("/getrole", getRole);
router.post("/getrole", postRole);
router.put("/getrole/:id", updateRole);
router.delete("/getrole/:id", deleteRole);

// designation-section
router.get("/getdesignation", getDesignation);
router.post("/getdesignation", postDesignation);
router.put("/getdesignation/:id", updateDesignation);
router.delete("/getdesignation/:id", deleteDesignation);

// category-section
router.get("/getcategory", getCategory);
router.post("/getcategory", postCategory);
router.put("/getcategory/:id", updateCategory);
router.delete("/getcategory/:id", deleteCategory);

module.exports = router;
