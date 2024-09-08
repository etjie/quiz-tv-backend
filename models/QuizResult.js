import { DataTypes } from "sequelize";
import sequelize from "../src/db/sequelize";
import User from "./User"; // Import the User model

const QuizResult = sequelize.define(
  "QuizResult",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // Reference the User model
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

QuizResult.belongsTo(User); // Define relation that QuizResult belongs to a User

export default QuizResult;
