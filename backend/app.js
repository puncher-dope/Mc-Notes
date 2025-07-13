require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  register,
  login,
  getUsers,
  updateUser
} = require("./controllers/user");
const {
  getTask,
  getTasks,
  deleteTask,
  editTask,
  addTask,
} = require("./controllers/task");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const mapTask = require("./helpers/mapTask");
const cors = require("cors");

const port = 3001;
const app = express();


app.use((req, res, next) => {
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());
app.options("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(204).send();
});


app.post("/api/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});


app.get("/api/tasks", authenticated, async (req, res) => {
  try {
    const { tasks, lastPage } = await getTasks(
      req.user.id,
      req.query.search,
      req.query.limit,
      req.query.page
    );
    res.send({ tasks: tasks.map(mapTask)  });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await getTask(req.params.id);
    res.send({ data: mapTask(task) });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.use(authenticated);




app.post("/api/tasks", authenticated, async (req, res) => {
  try {
    const newTask = await addTask({
      title: req.body.title,
      content: req.body.content
    }, req.user.id); 

    res.send({ data: mapTask(newTask) });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.patch("/api/tasks/:id", authenticated, async (req, res) => {
    try {
        const updatedTask = await editTask(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content
            },
            req.user.id
        );
        res.send({ data: mapTask(updatedTask) });
    } catch (e) {
        res.status(403).send({ error: e.message });
    }
});

app.get("/api/users", async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

app.patch("/api/users/:id", async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });
  res.send({ data: mapUser(newUser) });
});

app.delete("/api/tasks/:id", authenticated, async (req, res) => {
  try {
    await deleteTask(req.params.id, req.user.id);
    res.send({ error: null });
  } catch (e) {
    res.status(403).send({ error: e.message });
  }
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
});
