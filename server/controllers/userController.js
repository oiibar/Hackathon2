import { users } from "../models/store.js";

const registerUser = (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { username, password } = req.body;
    const existingUsers = users.list();

    for (let user of existingUsers) {
      if (user.username === username && user.password === password) {
        res.status(400).json("You already have an account");
        return;
      }
    }

    const id = users.create({ username, password });
    res.status(201).json({ username, password, id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { username, password } = req.body;
    const existingUsers = users.list();

    for (let user of existingUsers) {
      if (user.username === username && user.password === password) {
        const id = user.id;
        res.status(200).json(id);
        return;
      }
    }

    res.status(401).json("You probably don't have an account.");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  registerUser,
  loginUser,
};
