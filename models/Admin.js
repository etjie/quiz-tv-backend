import { DataTypes } from "sequelize";
import sequelize from "../src/db/sequelize";
const bcrypt = require("bcrypt");

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
    hooks: {
      beforeCreate: async (admin) => {
        // Hash the password before storing it in the database
        admin.password = await bcrypt.hash(admin.password, 10);
      },
      beforeUpdate: async (admin) => {
        // Hash the password before updating it, if it changed
        if (admin.changed("password")) {
          admin.password = await bcrypt.hash(admin.password, 10);
        }
      },
    },
  }
);

// Adding a custom instance method for password validation
Admin.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default Admin;
