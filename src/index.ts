import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelizeConnection from "./database/config/db";
import userRouter from "./routes/user.routes";
import * as bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import passport = require("passport");
import routeAuth from "./routes/routeAuth";
import session from "express-session";

require("./middlewares/passport");

dotenv.config();
const app: Express = express();

app.use(cors());
app.use(express.json());

// const upload = multer();
// app.use(upload.any());

const port = process.env.PORT || 8000;
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use("/api", routeAuth);
sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.use("/api/users", userRouter);
