import Cors from 'cors';
import initMiddleware from "../../../utils/middleware";
import User from "../../../../models/User";

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*',
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "GET") {
    // Fetch all users
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  } else if (req.method === "POST") {
    // Create a new user
    const { name, email, phoneNumber } = req.body;

    try {
      const user = await User.create({ name, email, phoneNumber });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }
}
