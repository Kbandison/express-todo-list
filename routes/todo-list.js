const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

/*********************MAIN ROUTES*******************/

// router.get("/", listController.getList);

router.post("/new-task", listController.newTask);

// router.post("/new-tasks", listController.newTasks);

// router.put("/update-task/:id", listController.updateTask);

// router.delete("/delete-task/:id", listController.deleteTask);

// router.delete("/delete-tasks", listController.deleteTasks);

module.exports = router;
