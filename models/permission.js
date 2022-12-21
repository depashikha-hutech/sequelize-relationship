const sequelize = require("sequelize");
const {DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize)=> {
    const Permissions = sequelize.define(
        "permissions",
        {
            id: {
                type :DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: DataTypes.STRING,
            permissions: DataTypes.JSONB,
        },
        { tabelName :"permissions"}
    );
    return Permissions;
}