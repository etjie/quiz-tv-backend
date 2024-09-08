import Cors from 'cors';
import initMiddleware from '../../utils/init-middleware';
import User from "../../../../models/User";
import QuizResult from "../../../../models/QuizResult";

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*',
  })
);


export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "GET") {
    const { score } = req.query;

    try {
      // Define the base query
      let queryOptions = {
        include: User,
        order: [["createdAt", "DESC"]], // Default sort by createdAt
      };

      // If score is provided, add it to the where clause
      if (score) {
        queryOptions.where = { score: score };
      }

      const results = await QuizResult.findAll(queryOptions);
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
