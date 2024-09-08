import QuizResult from "../../../../models/QuizResult";
import User from "../../../../models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch all quiz results
    try {
      const results = await QuizResult.findAll({
        include: User,
        order: [["createdAt", "DESC"]], // Sorting by createdAt in descending order
      });
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz results" });
    }
  } else if (req.method === "POST") {
    // Create a new quiz result
    const { userId, score } = req.body;

    try {
      const quizResult = await QuizResult.create({ userId, score });
      res.status(201).json(quizResult);
    } catch (error) {
      res.status(500).json({ error: "Failed to create quiz result" });
    }
  }
}
