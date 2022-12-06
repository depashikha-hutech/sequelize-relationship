const sequelize = require("sequelize");
const {DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize)=> {
    const Users = sequelize.define(
        "employees",
        {
            id: {
                type :DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: DataTypes.STRING,
            email:{type:DataTypes.STRING,allowNull: false, unique: true},
            phone:{type:DataTypes.STRING,allowNull: false},
            password:{type:DataTypes.CHAR,allowNull:false},
            isActive:{type:DataTypes.BOOLEAN,defaultValue: true},
        },
        { tabelName :"employees"}
    );
    return Users;
}