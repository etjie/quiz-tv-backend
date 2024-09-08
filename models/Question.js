import { DataTypes } from "sequelize";
import sequelize from "../src/db/sequelize";

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    choices: {
      type: DataTypes.JSON, // Stores choices as JSON array
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.TEXT, // Correct answer stored as TEXT
      allowNull: false,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

export default Question;
