const listSchema = require("../models/Todo-list");
const { v4: uuidv4 } = require("uuid");

let getList = async (req, res) => {
  let allTasks = await listSchema.find({});

  res.json({
    tasks: allTasks,
  });
};

let newTask = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const completed = req.body.completed;
  const dateCreated = new Date();
  const dateCompleted = new Date();
  const status = req.body.status;
  const id = uuidv4();

  let newTodo = new listSchema({
    name,
    description,
    completed,
    dateCreated,
    dateCompleted,
    status,
    id,
  });

  let savedTask = await newTodo.save();

  res.json({
    success: true,
    newTask: savedTask,
  });
};

let newTasks = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const completed = req.body.completed;
  const dateCreated = new Date();
  const dateCompleted = new Date();
  const status = req.body.status;

  let newTodo1 = new listSchema({
    name,
    description,
    completed,
    dateCreated,
    dateCompleted,
    status,
    id: uuidv4(),
  });

  let newTodo2 = new listSchema({
    name,
    description,
    completed,
    dateCreated,
    dateCompleted,
    status,
  });

  await listSchema.create(newTodo1, newTodo2);

  res.json({
    success: true,
  });
};

let updateTask = async (req, res) => {
  try {
    let originalTask = await listSchema.findOne({ id: req.params.id });

    let updatedTask = {};

    if (!originalTask) {
      res.json({
        success: false,
        message: `ID ${req.params.id} could not be found!`,
      });
    }

    if (req.body.name === undefined) {
      updatedTask.name = originalTask.name;
    } else {
      updatedTask.name = req.body.name;
    }

    if (req.body.description === undefined) {
      updatedTask.description = originalTask.description;
    } else {
      updatedTask.description = req.body.description;
    }

    if (req.body.completed === undefined) {
      updatedTask.completed = originalTask.completed;
    } else {
      updatedTask.completed = req.body.completed;
    }

    if (req.body.completed === false) {
      updatedTask.status = "incomplete";
    } else {
      updatedTask.status = "complete";
    }

    if (updatedTask.completed === true) {
      updatedTask.dateCompleted = new Date();
    } else {
      updatedTask.dateCompleted = originalTask.dateCreated;
    }

    updatedTask.id = originalTask.id;
    updatedTask.dateCreated = originalTask.dateCreated;

    await listSchema.updateOne(originalTask, updatedTask);

    res.json({
      success: true,
      updatedTask: updatedTask,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

let deleteTask = async (req, res) => {
  try {
    await listSchema.findOneAndDelete({ id: req.params.id });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

let deleteTasks = async (req, res) => {
  try {
    await listSchema.deleteMany({ name: req.params.name });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  newTask,
  newTasks,
  getList,
  updateTask,
  deleteTask,
  deleteTasks,
};
