import { Request, Response } from "express";
import User from "../database/models/User";
import uploadImage from "../utils/cloudinary";
import updadeProfileNotifiacation from "../middlewares/email-noti";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.findAll();

    if (!users || users.length === 0) {
      res.status(404).json({ message: "No users found" });
      return;
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const { firstname, lastname, email, imageUrl, googleId } = req.body;

    const newUser = await User.create({
      firstname: "Sabato",
      lastname: "Hakizimana",
      email: "mesabato@mail.com",
      imageUrl: "test test",
      googleId: "test test",
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.params;
    if (userId) {
      const user = await User.findOne({ where: { id: userId } });
      if (user !== null) {
        res.status(200).send({ user });
      } else {
        res.status(404).send({ error: "User not found" });
      }
    } else {
      res.status(400).send({ error: "User ID parameter is missing" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).send({ error: "Server Error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      res.status(400).send({ error: "User ID parameter is missing" });
      return;
    }

    const { firstname, lastname, imageUrl } = req.body;
    const body = req.body;

    if (!firstname && !lastname && !imageUrl) {
      res.status(400).send({
        error: "At least one property is required to update the user",
      });
      return;
    }
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }
    let uploadedImage;
    if (req.file) {
      uploadedImage = await uploadImage(req.file.buffer);
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.imageUrl = uploadedImage || user.imageUrl;

    await user.save();

    // console.log("THISSSSS", user.email);
    const userData = {
      name: "Tchami",
      profile: "profile",
    };
    let email = user.email;
    updadeProfileNotifiacation(userData, email);

    res.status(200).send({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ error: "Server Error" });
  }
};
