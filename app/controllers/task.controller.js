const Task = require("../model/task.model.js");

// Create and Save a new task
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a Task
    const task = new Task({
        title: req.body.title,
        value: req.body.value
    });
    console.log("tu działa");
    // Save Task in the database
    Task.create(task, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Task."
        });
        else res.send(data);
    });
};

// Retrieve all tasks from the database.
exports.findAll = (req, res) => {
    Task.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      else res.send(data);
    });
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Task with id ${req.params.taskId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Task with id " + req.params.taskId
          });
        }
      } else res.send(data);
    });
};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {
  
};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {
    Task.remove(req.params.taskId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Task with id ${req.params.taskId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Task with id " + req.params.taskId
          });
        }
      } else res.send({ message: `Task was deleted successfully!` });
    });
  };

// Delete all tasks from the database.
exports.deleteAll = (req, res) => {
    Task.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tasks."
        });
      else res.send({ message: `All Tasks were deleted successfully!` });
    });
  };