const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    mushroom_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    latitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
      validate: {
        isDecimal: true,
      },
    },

    longitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
      validate: {
        isDecimal: true,
      },
    },

    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    weather: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
