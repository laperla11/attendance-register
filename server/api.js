import { Router } from "express";
import User from "./model/User";
// const moment = require("moment");
const dayjs = require("dayjs");

import { getClient } from "./db";
import { request } from "https";

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
api.get("/users", (req, res, next) => {
  const client = getClient();
  client.connect(err => {
    if (err) {
      return next(err);
    }
    const db = client.db("heroku_cs1q5qk5");
    const collection = db.collection("users");
    collection.find().toArray((err, users) => {
      res.send(err || users);
    });
    client.close();
  });
});

//listing all sessions with attendence list
api.get("/sessions", (req, res, next) => {
  const client = getClient();
  client.connect(err => {
    if (err) {
      return next(err);
    }
    const db = client.db("heroku_cs1q5qk5");
    const collection = db.collection("sessions");
    collection.find().toArray((err, sessions) => {
      res.send(err || sessions);
    });
    client.close();
  });
});

//sign up for all users(student and mentor), require name, email, password and status from frontend
api.post("/register", (req, res, next) => {
  const client = getClient();
  client.connect(async err => {
    if (err) {
      return next(err);
    }
    const db = client.db("heroku_cs1q5qk5");
    const collection = db.collection("users");
    //check if the amail is already in use
    const checkUser = await collection.findOne({
      email: req.body.email
    });
    if (checkUser) {
      res.status(404).send("This email is already in use");
    }
    //if the email is not in use
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status
    });
    collection.insertOne(user, (err, result) => {
      res.send(err || result.ops[0]);
    });
    client.close();
  });
});

//allow the user to be added to database after log-in from frontend with the `timeofArrival`. require email and password from frontend
// api.put("/login", (req, res, next) => {
//   const client = getClient();
//   client.connect(async err => {
//     if (err) {
//       return next(err);
//     }
//     const db = client.db("heroku_cs1q5qk5");
//     //check if the user email and password matches
//     let collection = db.collection("users");
//     const user = await collection.findOne({
//       email: req.body.email
//     });
//     if (!user) {
//       res.status(404).send("your password or email is wrong");
//     }
//     //if the pasword is correct
//     //TODO: add one step for checking the location
//     collection = db.collection("sessions");
//     const sessionToUpdate = await collection.findOne({
//       //date : currentDate
//       date: "21/07/2019"
//     });
//     if (!sessionToUpdate) {
//       res.status(404).send("session is not created yet");
//     }
//     //if session is created on database
//     //change the status of student as attended with the arrival time
//     sessionToUpdate.attendance.forEach(student => {
//       if (student.email === req.body.email) {
//         const currentDate = dayjs().format("DD/MM/YYYY");
//         const timeOfArrival = new Date().toLocaleTimeString();
//         student["isAttended"] = true;
//         student["timeOfArrival"] = timeOfArrival;
//       }
//     });

//     //updating the session data on database
//     const options = {
//       returnOriginal: false
//     };
//     collection.findOneAndUpdate(
//       //{ date : currentDate}
//       { date: "21/07/2019" },
//       { sessionToUpdate },
//       options,
//       (err, result) => {
//         if (result.value) {
//           res.send(err || result.value);
//         } else {
//           res.sendStatus(404);
//         }
//       }
//     );
//     client.close();
//   });
// });
//show the attendance of the the current date with, list of attending students, total numbers of atendants, list of missing students and total number of missing students. proportion of attending students to total students
api.get("/attendance", (req, res, next) => {
  const client = getClient();
  client.connect(err => {
    if (err) {
      return next(err);
    }
    const db = client.db("heroku_cs1q5qk5");
    const collection = db.collection("sessions");
    collection.find().toArray((err, sessions) => {
      const currentDate = dayjs().format("DD/MM/YYYY");
      const currentSession = sessions
        .filter(session => session.date === "14/07/2019")
        .reduce(session => session);
      const attendingStudents = currentSession.attendance.filter(
        user => user.status === "STUDENT" && user.isAttended === true
      );
      const totalAttendingStudents = attendingStudents.length;
      const absentStudents = currentSession.attendance.filter(
        user => user.status === "STUDENT" && user.isAttended === false
      );
      const totalAbsentStudents = absentStudents.length;
      const proportion = (
        (totalAttendingStudents * 100) /
        (totalAttendingStudents + totalAbsentStudents)
      ).toFixed(2);
      res.send(
        err || {
          attendingStudents,
          totalAttendingStudents,
          absentStudents,
          totalAbsentStudents,
          proportion
        }
      );
    });
  });
});
//creating sessions by admin, require name of session, session number, date and city as request.body from frontend
api.post("/createSession", (req, res) => {
  const client = getClient();
  client.connect(async err => {
    if (err) {
      return next(err);
    }
    let { name, session, date, city } = req.body;
    if (!name || !session || !date || !city) {
      res.sendStatus(400);
      return;
    }
    const db = client.db("heroku_cs1q5qk5");
    let collection = db.collection("users");
    const studentUsers = await collection.find({ status: "STUDENT" }).toArray();
    studentUsers.forEach(user => {
      user["isAttended"] = false;
      user["timeOfArrival"] = null;
    });
    const newSession = { name, session, date, city, attendance: studentUsers };
    collection = db.collection("sessions");
    collection.insertOne(newSession, (err, result) => {
      res.send(err || result.ops[0]);
    });
    client.close();
  });
});

export default api;
