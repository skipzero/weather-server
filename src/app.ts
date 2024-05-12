import express, { NextFunction, Request, Response } from "express";
import weatherRoutes from "./routes/weather";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
import dotenv from "dotenv"
import path from 'path'
import weatherApi from './utils/weather';

dotenv.config()

const secret = process.env.SESSION_SECRET as string;

const app = express();

const mongoUrl = process.env.MONGODB_URI;


app.use(morgan("dev"));

app.use(express.json());

 app.use(session({
   secret,
   resave: false,
   saveUninitialized: false,
   cookie: {
    maxAge: 60 * 60 * 1000,
   },
   rolling: true,
   store: MongoStore.create({
     mongoUrl
   }),
 }));
weatherApi;
app.disable('x-powered-by');

// app.use(express.static('public'))
// app.use('/', (req, res) => {
//   res.status(200).send('roots')
// })
app.use('/', weatherRoutes)

app.use('/api/weather', weatherRoutes)
app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;