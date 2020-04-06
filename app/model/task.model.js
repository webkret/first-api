const sql = require("./db.js");

// constructor
const Task = function(task) {
  this.title = task.title;
  this.value = task.value;
};

Task.create = (newTask, result) => {
  sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Task: ", { id: res.insertId, ...newTask });
    result(null, { id: res.insertId, ...newTask });
  });
};

Task.findById = (TaskId, result) => {
  sql.query(`SELECT * FROM tasks WHERE id = ${TaskId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Task: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Task with the id
    result({ kind: "not_found" }, null);
  });
};

Task.getAll = result => {
  sql.query("SELECT * FROM tasks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Tasks: ", res);
    result(null, res);
  });
};

Task.updateById = (id, Task, result) => {
  sql.query(
    "UPDATE tasks SET title = ?, value = ? WHERE id = ?",
    [Task.title, Task.value, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Task with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Task: ", { id: id, ...Task });
      result(null, { id: id, ...Task });
    }
  );
};

Task.remove = (id, result) => {
  sql.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Task with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Task with id: ", id);
    result(null, res);
  });
};

Task.removeAll = result => {
  sql.query("DELETE FROM tasks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Tasks`);
    result(null, res);
  });
};

module.exports = Task;