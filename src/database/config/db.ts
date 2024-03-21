import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const db_uri = process.env.DATABASE_URL as string;
async function connectToDatabase() {
  const sequelize = new Sequelize(db_uri, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  await sequelize.authenticate();
}

connectToDatabase();
export default connectToDatabase;
