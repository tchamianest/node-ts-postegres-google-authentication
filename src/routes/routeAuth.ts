import express from "express";
import passport from "passport";

import { emailHandle } from "../controlles/emailAuth";
const routeAuth = express.Router();

routeAuth.get(
  "/signup",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

routeAuth.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  emailHandle
);

export default routeAuth;
