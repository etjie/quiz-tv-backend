import Cors from 'cors';
import initMiddleware from '../../utils/init-middleware';
import Question from "../../../../models/Question";

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*',
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method === "GET") {
    // Fetch all questions
    try {
      const questions = await Question.findAll();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  } else if (req.method === "POST") {
    // Create a new question
    const { question, choices, correctAnswer } = req.body;

    try {
      const newQuestion = await Question.create({
        question,
        choices,
        correctAnswer,
      });
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: "Failed to create question" });
    }
  }
}
