import express from "express";
import multerUpload from "../utils/multer";
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
} from "../controlles/user.controller";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter
  .route("/:id")
  .get(getOneUser)
  .patch(multerUpload.single("imageUrl"), updateUser);
export default userRouter;
// multerUpload.single("imageUrl")
