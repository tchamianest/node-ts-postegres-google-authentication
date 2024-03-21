// models/User.ts

import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
  googleId: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'googleId'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public googleId!: string;
  public email!: string;
  public displayName!: string;
  public photoURL!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  User.init({
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User', // change modelName from 'GoogleUser' to 'User'
  });

  return User;
};
