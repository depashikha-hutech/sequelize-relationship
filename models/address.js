const sequelize = require("sequelize");
const {DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize)=> {
    const Address = sequelize.define(
        "addresses",
        {
            id: {
                type :DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            landmark: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            country:{type:DataTypes.STRING,defaultValue: "INDIA"},
            coordinates: {
                type: DataTypes.JSONB,
                defaultValue:{ north: 28.7041, east: 77.1025 },
            },
            pin: DataTypes.STRING,
        },
        { tabelName :"addresses"}
    );
    return Address;
}