const express = require("express");
const { register, login } = require("../controllers/user");
const mapUser = require("../helpers/mapUser");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        domain:
          process.env.NODE_ENV === "development"
            ? undefined
            : ".yourdomain.com",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "strict",
        path: "/",
        domain:
          process.env.NODE_ENV === "development"
            ? undefined
            : ".yourdomain.com",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.post("/logout", (req, res) => {
  res
    .cookie("token", "", { 
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      domain: process.env.NODE_ENV === "development" ? undefined : ".yourdomain.com",
    })
    .send({});
});

module.exports = router;
