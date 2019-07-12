import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
// import mongoose from "mongoose";

import apiRouter from "./api";


// connect to DB 
// mongoose.connect("mongodb+srv://semi:colon@mflix-2ykku.mongodb.net/test?retryWrites=true&w=majority",
//   { useNewUrlParser: true });

const apiRoot = "/api";
const app = express();
const staticDir = path.join(__dirname, "static");

// General configuration
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// require HTTPS in production
if (app.get("env") === "production") {
  app.enable("trust proxy");
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
    }
    next();
  });
}

// Load API router
app.use(apiRoot, apiRouter);

// Serve the bundled client from the server
app.use(express.static(staticDir));
app.get("*", (req, res, next) => {
  if (req.url.startsWith(apiRoot)) {
    return next();
  }
  res.sendFile(path.join(staticDir, "index.html"));
});

export default app;
