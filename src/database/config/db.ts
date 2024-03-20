import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

async function connectToDatabase() {
  dotenv.config(); 
  const sequelize = new Sequelize('process.env.DATABASE_URL', {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
  });
  
    await sequelize.authenticate();
}

connectToDatabase();
export default connectToDatabase;
