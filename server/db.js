import { MongoClient } from "mongodb";

// const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/cyf";
const dbUrl = process.env.MONGODB_URI || "mongodb+srv://semi:colon@mflix-2ykku.mongodb.net/test?retryWrites=true&w=majority";
const configuration = { useNewUrlParser: true };

export const getClient = () => new MongoClient(dbUrl, configuration);
