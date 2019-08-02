/* eslint-disable arrow-parens */
import User from "./model/User";
const dayjs = require("dayjs");
const timeZone = require("dayjs-ext/plugin/timeZone"); // load on demand
dayjs.extend(timeZone); // use plugin

const Joi = require("joi");

// const bcrypt = require("bcryptjs");
import bcrypt from "bcryptjs";

import { getClient } from "./db";

export const registerTest = (req, res, next) => {
  const client = getClient();
  client.connect(err => {
    if (err) {
      return next(err);
    }
    const db = client.db("heroku_cs1q5qk5");
    const collection = db.collection("users");
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
};

export const loginTest = (req, res, next) => {
  const client = getClient();
  client.connect(err => {
    if (err) {
      return next(err);
    }
    const db = client.db("heroku_cs1q5qk5");
    const collection = db.collection("users");
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      status: req.body.status
    });

    collection.findOne(user, (err, result) => {
      res.send(err || result.ops[0]);
    });
    client.close();
  });
};

export const getUsers = (req, res, next) => {
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
};

export const getPersonalAttendance = (req, res, next) => {
  const client = getClient();
  client.connect(async err => {
    if (err) {
      return next(err);
    }
    const db = client.db("heroku_cs1q5qk5");
    let collection = db.collection("users");
    let students = await collection.find().toArray();
    students = students.filter(
      student => student.status.toLowerCase() == "student"
    );
    collection = db.collection("sessions");
    collection.find().toArray((err, sessions) => {
      let modules = sessions.map(session => session.name);
      modules = [...new Set(modules)];
      modules = modules.map(modul => {
        return { name: modul, absence: [], attendance: [] };
      });

      sessions.forEach(session => {
        session["absentStudents"] = [];
      });
      students.forEach(student => {
        //students attendance
        student["attendance"] = [];
        student["absence"] = [];
        sessions.forEach(session => {
          if (
            session.attendance
              .map(student => student.email)
              .includes(student.email)
          ) {
            student.attendance.push({
              id: session._id,
              name: session.name,
              number: session.number,
              date: session.date
            });
          } else {
            session.absentStudents.push(student);
            student.absence.push({
              id: session._id,
              name: session.name,
              session: session.number,
              date: session.date
            });
          }
          //session attendance
          session["attendingStudents"] = session.attendance.filter(
            user => user.status.toLowerCase() == "student"
          );
          session["totalAttendingStudents"] = session.attendingStudents.length;
          session["totalAbsentStudents"] = session.absentStudents.length;
          session["attendanceRate"] = (
            (100 * session.totalAttendingStudents) /
            (session.totalAttendingStudents + session.totalAbsentStudents)
          ).toFixed(2);
        }); //sessions

        //modules attendance
        student["missedAnyModule"] = [];
        modules.forEach(modul => {
          if (
            student.attendance.map(event => event.name).includes(modul.name)
          ) {
            modul.attendance.push(student);
            // return;
          } else {
            student.missedAnyModule.push(modul.name);
            modul.absence.push(student);
          }
          modul["attendanceRate"] = (
            (modul.attendance.length * 100) /
            students.length
          ).toFixed(2);
        });

        student["attendanceRate"] = Number(
          (
            (100 * student.attendance.length) /
            (student.attendance.length + student.absence.length)
          ).toFixed(2)
        );
      });
      res.send(err || { students, sessions, modules });
    });
  });
};

export const getSessions = (req, res, next) => {
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
};

export const createSession = (req, res) => {
  const client = getClient();
  client.connect(async err => {
    if (err) {
      return next(err);
    }
    let { latitude, longitude } = req.query;
    let { name, number, date, city } = req.body;
    if (!name || !number || !date || !city) {
      res.sendStatus(400);
      return;
    }
    const db = client.db("heroku_cs1q5qk5");
    let collection = db.collection("users");
    let studentUsers = [];
    const newSession = {
      name,
      number,
      date,
      city,
      latitude: latitude ? latitude : "51.53",
      longitude: longitude ? longitude : "-0.107",
      attendance: studentUsers
    };
    collection = db.collection("sessions");
    collection.insertOne(newSession, (err, result) => {
      res.send(err || result.ops[0]);
    });
    client.close();
  });
};

(req, res) => {
  const client = getClient();
  const selectedSessionDate = req.query.date;
  client.connect(async err => {
    if (err) {
      return next(err);
    }
    let { name, number, date, city } = req.body;
    const updateObject = {};
    name ? (updateObject.name = name) : null;
    city ? (updateObject.city = city) : null;
    number ? (updateObject.number = number) : null;
    date ? (updateObject.date = date) : null;
    // console.log(updateObject);
    const db = client.db("heroku_cs1q5qk5");
    let collection = db.collection("sessions");
    const options = { returnOriginal: false };
    collection.findOneAndUpdate(
      { date: selectedSessionDate }, // { date : selectedSessionDate}
      { $set: updateObject },
      options,
      function(error, result) {
        if (result.value) {
          res.send(error || result.value);
        } else {
          console.log("no result");
          res.sendStatus(404);
        }
      }
    );
    client.close();
  });
};

export const getAttendance = (req, res, next) => {
  const client = getClient();
  client.connect(async err => {
    if (err) {
      return next(err);
    }
    const db = client.db("heroku_cs1q5qk5");
    let collection = db.collection("users");
    let students = await collection.find().toArray();
    students = students.filter(
      student => student.status.toLowerCase() == "student"
    );
    collection = db.collection("sessions");
    collection.find().toArray((err, sessions) => {
      const today = dayjs().format("DD/MM/YYYY");
      const selectedDate = req.query.date === "today" ? today : req.query.date;
      let currentSession = sessions.filter(
        session => session.date === selectedDate
      ); //should be for real life
      if (currentSession.length > 0) {
        currentSession = currentSession.reduce(session => session);
        const { name, session, date } = currentSession;
        const attendingStudents = currentSession.attendance.filter(
          user =>
            user.status.toLowerCase() === "student" && user.isAttended === true
        );
        const totalAttendingStudents = attendingStudents.length;
        const attendantStudentsEmails = attendingStudents.map(
          attendant => attendant.email
        );
        let absentStudents = [];
        students.forEach(student => {
          if (!attendantStudentsEmails.includes(student.email)) {
            absentStudents.push(student);
          }
        });
        const totalAbsentStudents = absentStudents.length;
        const proportion = (
          (totalAttendingStudents * 100) /
          (totalAttendingStudents + totalAbsentStudents)
        ).toFixed(2);
        res.send(
          err || {
            sessions,
            name,
            session,
            date,
            attendingStudents,
            totalAttendingStudents,
            absentStudents,
            totalAbsentStudents,
            proportion
          }
        );
      } else {
        res.send(err || { sessions });
      }
    });
  });
};

export const register = (req, res, next) => {
  const client = getClient();
  client.connect(async err => {
    if (err) {
      return next(err);
    }
    const { name, email, password, status } = req.body;
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(3)
        .required(),
      email: Joi.string()
        .trim()
        .required()
        .email(),
      password: Joi.string()
        .min(6)
        .required(),
      status: Joi.string().required()
    });
    Joi.validate(req.body, schema, (err, result) => {
      if (err) {
        return res.status(422).json({ msg: err.details[0].message });
      }
      return;
    });
    const db = client.db("heroku_cs1q5qk5");
    const collection = db.collection("users");
    //check if the email is already in use
    const checkUser = await collection.findOne({
      email: email
    });
    if (checkUser) {
      res.status(404).json({ msg: "This email is already in use" });
      return;
    }
    //if the email is not in use
    const user = new User({
      name: name,
      email: email,
      //password: hashedPwd,
      password: password,
      status: status
    });
    collection.insertOne(user, (err, result) => {
      res.send(err || result.ops[0]);
    });
    client.close();
  });
};

export const login = (req, res, next) => {
  const client = getClient();
  client.connect(async err => {
    if (err) {
      return next(err);
    }
    const { email, password, status } = req.body;
    const schema = Joi.object().keys({
      email: Joi.string()
        .trim()
        .required()
        .email(),
      password: Joi.string()
        .min(6)
        .required(),
      status: Joi.string().required()
    });
    Joi.validate(req.body, schema, (err, result) => {
      if (err) {
        return res.status(422).json({ msg: err.details[0].message });
      }
      return;
    });

    const db = client.db("heroku_cs1q5qk5");
    //check if the user email and password matches
    let collection = db.collection("users");
    let user = await collection.findOne({
      email: email
    });
    // console.log({ user });
    //if no matching with the provided email
    if (!user) {
      res.status(404).json({
        msg: "Your email is wrong"
      });
      return;
    }
    //checking the status of the user
    if (user.status.toLowerCase() != status.toLowerCase()) {
      res.status(400).json({
        msg: `You selected wrong status as ${status}, you should select ${
          user.status
        } status!`
      });
      return;
    }
    //checking the password
    if (user.password != password) {
      res.status(400).json({
        msg: `Your password is wrong!`
      });
      return;
    }
    //if the password is correct
    const today = dayjs().format("YYYY-MM-DD");
    const selectedDate = req.query.date ? req.query.date : today;
    collection = db.collection("sessions");
    const sessionToUpdate = await collection.findOne({
      date: "2019-07-31" //hard coded for testing reality date : selectedDate
    });
    if (!sessionToUpdate && status.toLowerCase() == "student") {
      res.status(404).send({
        msg: "The session is not created yet! "
      });
      return;
    }
    //if user is check if he is already registered or not by email
    if (
      user.status.toLowerCase() == "student" &&
      sessionToUpdate.attendance
        .map(student => {
          return student.email;
        })
        .includes(user.email)
    ) {
      res.status(404).send({
        msg: "You are alredy logged in to the class! "
      });
      return;
    }

    user = {
      userId: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      city: user.city,
      isAttended: true,
      timeOfArrival: dayjs().format("HH:mm", { timeZone: "Europe/London" }) // convert to CET before formatting
    };
    sessionToUpdate.attendance.push(user);
    const options = { returnOriginal: false };
    //updating the session data on database
    collection.findOneAndUpdate(
      { date: "2019-07-31" }, // { date : selectedDate}
      {
        $set: {
          attendance: sessionToUpdate.attendance
        }
      },
      options,
      (err, result) => {
        if (result.value) {
          // jwt token

          res.send(err || result.value);
        } else {
          res.sendStatus(404);
        }
      }
    );
    client.close();
  }); //client connect
};
