import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelizeConnection from "./database/config/db";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8000;
sequelizeConnection.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
    process.exit(1); 
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});
