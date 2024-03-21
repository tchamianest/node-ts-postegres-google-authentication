import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db_uri = process.env.DATABASE_URL as string;

const sequelizeConnection = new Sequelize(db_uri, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelizeConnection;
