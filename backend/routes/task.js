const express = require("express");
const { addTask, getUserTasks, getUserTask, editUserTask, deleteTask } = require("../controllers/task");
const authenticated = require("../middlewares/authenticated");
const mapTask = require("../helpers/mapTask");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, async (req, res) => {
  try {
    const { tasks, lastPage } = await getUserTasks(
      req.user.id,
      req.query.search,
      req.query.limit,
      req.query.page
    );
    res.send({ data: { lastPage, tasks: tasks.map(mapTask) } });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get("/:id", authenticated, async (req, res) => {
  try {
    const task = await getUserTask(req.params.id, req.user.id);
    res.send({ data: mapTask(task) });
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});

router.post("/", authenticated, async (req, res) => {
  try {
    const newTask = await addTask(
      {
        title: req.body.title,
        content: req.body.content,
      },
      req.user.id
    );
    res.send({ data: mapTask(newTask) });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.patch("/:id", authenticated, async (req, res) => {
  try {
    const updatedTask = await editUserTask(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      req.user.id
    );
    res.send({ data: mapTask(updatedTask) });
  } catch (e) {
    res.status(403).send({ error: e.message });
  }
});

router.delete("/:id", authenticated, async (req, res) => {
  try {
    await deleteTask(req.params.id, req.user.id);
    res.send({ error: null });
  } catch (e) {
    res.status(403).send({ error: e.message });
  }
});

module.exports = router;
