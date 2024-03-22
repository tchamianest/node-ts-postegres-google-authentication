import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const Secret = "any-random-string";
import User from "../database/models/User";
export const emailHandle = async (req: Request, res: Response) => {
  try {
    if (req.user) {
      const token = await jwt.sign(req.user, Secret);
      const response = {
        status: "success",
        token: token,
        user: req.user,
      };
      const { id, firstName, lastName, email, imageUrl }: any = response.user;
      const newUser = await User.create({
        firstname: firstName,
        lastname: lastName,
        email: email,
        imageUrl: imageUrl,
        googleId: id,
      });
      res.status(200).json({ googleuser: response, databaseUser: newUser });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
