import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({}, { __v: 0 });
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        role,
      },
      {
        //  // return user updated
        new: true,
      }
    );
    res.json({ user });
  } catch (error) {
    console.error("Error update user:", error);
    res.status(500).json({ error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id, {
      name,
      email,
      password,
      role,
    });
    res.json({ user });
  } catch (error) {
    console.error("Error delete user:", error);
    res.status(500).json({ error: error.message });
  }
};
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    res.json({ user });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: error.message });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const { name, _id, role } = user;
    const token = jwt.sign({ name, email, role, _id }, process.env.jWT_SECRET);
    if (user && bcrypt.compareSync(password, user.password)) {
      return res.status(201).json({ message: "signin is successfully", token });
    }
    res.status(400).json({ error: "Invalid password" });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: error.message });
  }
};
