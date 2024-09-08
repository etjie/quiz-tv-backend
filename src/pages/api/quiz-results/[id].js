import QuizResult from "../../../../models/QuizResult";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const result = await QuizResult.findByPk(id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "Quiz result not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz result" });
    }
  } else if (req.method === "PUT") {
    const { score } = req.body;

    try {
      const result = await QuizResult.findByPk(id);
      if (result) {
        result.score = score;
        await result.save();
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "Quiz result not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update quiz result" });
    }
  } else if (req.method === "DELETE") {
    try {
      const result = await QuizResult.findByPk(id);
      if (result) {
        await result.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ error: "Quiz result not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete quiz result" });
    }
  }
}
