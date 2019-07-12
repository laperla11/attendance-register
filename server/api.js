import { Router } from "express";
import User from "./model/User";


import { getClient } from "./db";

const api = new Router();

api.get("/", (_, res, next) => {
  const client = getClient();

  client.connect((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Hello, Welcome to attendance-register!" });
    client.close();
  });
});

// AUTHENTICATION
api.post("/register", async (req, res, next) => {
  const client = getClient();
  client.connect((err) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    user.save();
    // res.json(savedUser);
    if (err) {
      return next(err);
    }
    res.send(user);

    client.close();
  });
});


export default api;
