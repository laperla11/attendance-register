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


api.post("/register", (req, res, next) => {
  const client = getClient();
  client.connect((err) => {
    if (err) {
      return next(err);
    }
    const db = client.db("heroku_cs1q5qk5");
    const collection = db.collection("users");
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    collection.insertOne(user, (err, result) => {
      res.send(err || result.ops[0]);
    });
    // res.json(savedUser);

    // res.send(user);

    client.close();
  });
});


export default api;
