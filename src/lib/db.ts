import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE,
});

export default sequelize;
