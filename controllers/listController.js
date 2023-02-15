const listSchema = require("../models/todo-list");

let newTask = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const completed = req.body.completed;
  const dateCreated = new Date();
  const dateCompleted = new Date();
  const status = req.body.status;

  let newTodo = new listSchema({
    name,
    description,
    completed,
    dateCreated,
    dateCompleted,
    status,
  });

  let savedTask = await newTodo.save();

  res.json({
    success: true,
    newTask: savedTask,
  });
};

module.exports = {
  newTask,
};
