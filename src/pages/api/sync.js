import sequelize from "../../db/sequelize";
import User from "../../models/User";
import Question from "../../models/Question";
import QuizResult from "../../models/QuizResult";

export default async function handler(req, res) {
  try {
    await sequelize.sync({ force: true }); // `force: true` drops and recreates tables, use with caution
    res.status(200).json({ message: "Database synced successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to sync database" });
  }
}
