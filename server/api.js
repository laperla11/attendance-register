import { Router } from "express";
import { registerTest, loginTest, getUsers, getSessions, getAttendance, createSession, register, login } from "./controllers.js"
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

api.post("/registerJoanTest", registerTest);

api.get("/loginJoanTest", loginTest);

//listing all users (student, mentor and admin)
api.get("/users", getUsers);

//listing all sessions with attendence list
api.get("/sessions", getSessions);

//sign up for all users(student and mentor), require name, email, password and status from frontend
api.post("/register", register);

//allow the user to be added to database after log-in from frontend with the `timeofArrival`. require email and password, status from frontend
api.put("/login", login); //out

//show the attendance of the the current date with, list of attending students, total numbers of atendants, list of missing students and total number of missing students. proportion of attending students to total students
api.get("/attendance", getAttendance);

//creating sessions by admin, require name of session, session number, date and city as request.body from frontend
api.post("/createSession", createSession);

export default api;
