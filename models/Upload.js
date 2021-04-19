const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Upload extends Model { }

Upload.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: true,
        },
        longitude: {
            type: DataTypes.DECIMAL(10, 6),
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "upload",
    }
);

module.exports = Upload;
