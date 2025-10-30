import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db.ts";

export interface JokeAttributes {
  id?: number;
  question: string;
  answer: string;
}

export class Joke extends Model<JokeAttributes> implements JokeAttributes {
  public id!: number;
  public question!: string;
  public answer!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Joke.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Joke",
    tableName: "jokes",
    timestamps: true,
  }
);

export default Joke;
