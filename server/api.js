import { Router } from "express";
import {
  getUsers,
  getSessions,
  getAttendance,
  createSession,
  getAttendance,
  updateSession,
  register,
  login
} from "./controllers.js";
import { getClient } from "./db";

const api = new Router();

api.get("/", (_, res, next) => {
  const client = getClient();

  client.connect(err => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Hello, Welcome to attendance-register!" });
    client.close();
  });
});

//listing all users (student, mentor and admin)
api.get("/users", getUsers);

//listing all users (student, mentor and admin)
api.get("/attendance", getAttendance);

//listing all sessions with attendence list
api.get("/sessions", getSessions);

//sign up for all users(student and mentor), require name, email, password and status from frontend
api.post("/register", register);

//allow the user to be added to database after log-in from frontend with the `timeofArrival`. require email and password, status from frontend
api.put("/login", login); //out

//creating sessions by admin, require name of session, session number, date and city as request.body from frontend
api.post("/createSession", createSession);

//updating session with date
api.put("/updateSession", updateSession);

export default api;
