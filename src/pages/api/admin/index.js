import Cors from "cors";
import initMiddleware from "../../../utils/middleware";
import Admin from "../../../../models/Admin";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
    origin: "*",
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "GET") {
    // List all admins
    try {
      const admins = await Admin.findAll({
        attributes: ["id", "username", "createdAt", "updatedAt"], // Only return necessary fields
      });
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admins" });
    }
  } else if (req.method === "POST") {
    const { action, username, password, oldPassword, newPassword } = req.body;

    if (action === "create") {
      // Create a new admin
      try {
        const admin = await Admin.create({ username, password });
        res.status(201).json(admin);
      } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ error: "Failed to create admin" });
      }
    } else if (action === "login") {
      // Login functionality
      try {
        const admin = await Admin.findOne({ where: { username } });
        if (!admin || !(await admin.validPassword(password))) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }

        res.status(200).json({ message: "Login successful" });
      } catch (error) {
        res.status(500).json({ error: "Login failed" });
      }
    } else if (action === "change-password") {
      // Change password functionality
      try {
        const admin = await Admin.findOne({ where: { username } });

        if (!admin || !admin.validPassword(oldPassword)) {
          return res.status(401).json({ error: "Old password is incorrect" });
        }

        admin.password = newPassword;
        await admin.save();

        res.status(200).json({ message: "Password changed successfully" });
      } catch (error) {
        res.status(500).json({ error: "Password change failed" });
      }
    } else {
      res.status(400).json({ error: "Invalid action" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
