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
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const question = await Question.findByPk(id);
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ error: "Question not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch question" });
    }
  } else if (req.method === "PUT") {
    const { question, choices, correctAnswer } = req.body;

    try {
      const existingQuestion = await Question.findByPk(id);
      if (existingQuestion) {
        existingQuestion.question = question;
        existingQuestion.choices = choices;
        existingQuestion.correctAnswer = correctAnswer;
        await existingQuestion.save();
        res.status(200).json(existingQuestion);
      } else {
        res.status(404).json({ error: "Question not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update question" });
    }
  } else if (req.method === "DELETE") {
    try {
      const question = await Question.findByPk(id);
      if (question) {
        await question.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ error: "Question not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete question" });
    }
  }
}
