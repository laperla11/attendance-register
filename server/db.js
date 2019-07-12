import { MongoClient } from "mongodb";

//const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/cyf";
const dbUrl = process.env.MONGODB_URI || "mongodb://joan:semi-colon2019@ds145881.mlab.com:45881/heroku_cs1q5qk5";
const configuration = { useNewUrlParser: true };

export const getClient = () => new MongoClient(dbUrl, configuration);
