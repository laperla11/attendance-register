import User from "./model/User";
const dayjs = require("dayjs");
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
  client.connect((err) => {
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
}

export const getSessions = (req, res, next) => {
  const client = getClient();
  client.connect((err) => {
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
}

export const createSession = (req, res) => {
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
    let studentUsers = [];
    const newSession = { name, session, date, city, attendance: studentUsers };
    collection = db.collection("sessions");
    collection.insertOne(newSession, (err, result) => {
      res.send(err || result.ops[0]);
    });
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
      let currentSession = sessions
        // .filter(session => session.date === "14/07/2019") //it is hard coded for testing
        .filter(session => session.date === selectedDate); //should be for real life
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
    if (!name || !email || !password || !status) {
      res.status(400).json({ msg: "fill out all the fields" });
      return;
    }
    const db = client.db("heroku_cs1q5qk5");
    const collection = db.collection("users");
    //check if the email is already in use
    const checkUser = await collection.findOne({
      email: req.body.email
    });
    if (checkUser) {
      res.status(404).json({ msg: "This email is already in use" });
      return;
    }

    //Hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);

    //if the email is not in use
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPwd,
      status: req.body.status
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
    if (!email || !password || !status) {
      res.status(400).json({ msg: "fill out all the fields" });
      return;
    }
    const db = client.db("heroku_cs1q5qk5");
    //check if the user email and password matches
    let collection = db.collection("users");
    let user = await collection.findOne({
      email: req.body.email
    });
    //if no matching with the provided email
    if (!user) {
      res.status(404).json({
        msg: "your email is wrong"
      });
      return;
    }
    //checking the satus of the user
    if (user.status.toLowerCase() != req.body.status.toLowerCase()) {
      res.status(400).json({
        msg: `You selected wrong status as ${
          req.body.status
        }, you should select ${user.status} status!`
      });
      return;
    }
    //checking the password
    if (user.password != req.body.password) {
      res.status(400).json({
        msg: `Your password is wrong!`
      });
      return;
    }
    //if the pasword is correct
    const today = dayjs().format("DD/MM/YYYY");
    collection = db.collection("sessions");
    const sessionToUpdate = await collection.findOne({
      date: "21/07/2019" //hard coded for testing reality date : today
    });
    if (!sessionToUpdate) {
      res.status(404).send({
        msg: "The ession is not created yet! "
      });
      return;
    }
    //if user is check if he is already regsitered or not by email

    user = {
      userId: user._id,
      name: user.name,
      email: user.email,
      status: user.status,
      city: user.city,
      isAttended: true,
      timeOfArrival: dayjs().format("HH:mm")
    };
    sessionToUpdate.attendance.push(user);
    const options = { returnOriginal: false };
    //updating the session data on database
    collection.findOneAndUpdate(
      { date: "21/07/2019" }, // { date : today}
      {
        $set: {
          attendance: sessionToUpdate.attendance
        }
      },
      options,
      (err, result) => {
        if (result.value) {
          res.send(err || result.value);
        } else {
          res.sendStatus(404);
        }
      }
    );
    client.close();
  }); //client connect
};