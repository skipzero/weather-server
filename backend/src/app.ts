import express, {Application, NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import cors from "cors";
import env from "./utils/config";;
import {User} from "./models/user";
import Note from "./models/note";
import bcrypt from "bcrypt";
import morgan from 'morgan';
import createHttpError, {isHttpError} from "http-errors";
import session from 'express-session'
import MongoStore from 'connect-mongo'

// Notes routes to change as needed for weather...
import notesRoutes from './routes/notes';

// User routes will most likely stay after this time
import userRoutes from './routes/users';

// Create the express app and  import the type of app from express;
const app: Application = express();
// logging
app.use(morgan('dev'))
// Cors
app.use(cors());

app.use(session({
  secret: env.ACCESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}))

// Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Declare The PORT Like This
const PORT: number = 8000;

app.get("/", async (req, res) => {
  const notes = await Note.find().exec()
  res.status(200).json(notes)
});

// Listen the server
app.listen(PORT, async () => {
  console.log(`🗄️  Server Fire on http:localhost//${PORT}`);

  // Connect To The Database
  try {
    await mongoose.connect(
      process.env.DATABASE_URL as string
    );
    console.log("🛢️  Connected To Database");
  } catch (error) {
    console.log("⚠️ Error to connect Database");
  }
});
export default app;