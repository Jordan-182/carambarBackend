import sequelize from "../lib/db.ts";
import Joke from "../models/joke.model.ts";

export class JokeService {
  /**
   * Get all the jokes
   */
  static async getAllJokes(): Promise<Joke[]> {
    return await Joke.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  /**
   * Get one joke by its ID
   */
  static async getJokeById(id: number): Promise<Joke | null> {
    return await Joke.findByPk(id);
  }

  /**
   * Get a random joke
   */
  static async getRandomJoke(): Promise<Joke | null> {
    return await Joke.findOne({ order: sequelize.random() });
  }

  /**
   * Create a new joke
   */
  static async createJoke(question: string, answer: string): Promise<Joke> {
    return await Joke.create({ question, answer });
  }

  /**
   * Update a joke
   */
  static async updateJoke(
    id: number,
    question: string,
    answer: string
  ): Promise<Joke | null> {
    const existingJoke = await Joke.findByPk(id);
    if (!existingJoke) return null;

    await Joke.update(
      { question, answer },
      {
        where: { id },
        returning: true,
      }
    );

    const updatedJoke = await Joke.findByPk(id);
    return updatedJoke;
  }

  /**
   * Delete a joke
   */
  static async deleteJoke(id: number): Promise<boolean> {
    const result = await Joke.destroy({ where: { id } });
    return result > 0;
  }
}
