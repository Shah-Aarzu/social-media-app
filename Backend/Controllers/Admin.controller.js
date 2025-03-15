import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admin } from "../Models/Admin.model.js";

export const loginAdmin = async (req, res) => {
  const { adminId, password } = req.body;
  let token = "";

  try {
    const admin = await Admin.findOne({ adminId });

    if (!admin || !(password === admin.password)) {
      return res.json({ message: "Invalid credentials", auth: false, token });
    }

    token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Logged in", auth: true, token });
  } catch (error) {
    res.json({ message: "Server error" });
  }
};
