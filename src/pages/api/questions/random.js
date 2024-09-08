import Question from "../../../../models/Question";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch all questions
      const questions = await Question.findAll();

      console.log(JSON.stringify(questions, null, 2))

      // Shuffle the questions to get them in random order
      const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

      // Optionally, limit to a certain number of questions
      const numberOfQuestions = req.query.limit || 5; // Default to 5 questions if no limit provided
      const randomQuestions = shuffledQuestions.slice(0, numberOfQuestions);

      res.status(200).json(randomQuestions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions randomly" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
