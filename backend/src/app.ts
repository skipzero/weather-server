import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const mongo_uri = process.env.MOGODB_URI;
const session_secret = process.env.SESSION_SECRET as string;
const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
  store: MongoStore.create({
    mongoUrl: mongo_uri,
    ttl: 60 * 60 * 1000,
    touchAfter: 24 * 3600,
  }),
  secret: session_secret,
  resave: false,
  saveUninitialized: false,
}));

app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);

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