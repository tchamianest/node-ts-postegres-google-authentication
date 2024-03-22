import express from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controlles/user.controller";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getOneUser).patch(updateUser);
export default userRouter;
