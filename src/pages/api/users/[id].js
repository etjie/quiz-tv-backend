import Cors from 'cors';
import initMiddleware from '../../utils/init-middleware';
import User from "../../../../models/User";

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*',
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await User.findByPk(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  } else if (req.method === "PUT") {
    const { name, email, phoneNumber } = req.body;

    try {
      const user = await User.findByPk(id);
      if (user) {
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  } else if (req.method === "DELETE") {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}
