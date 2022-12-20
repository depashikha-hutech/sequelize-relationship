const sequelize = require("sequelize");
const {DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize)=> {
    const Meetings = sequelize.define(
        "meetings",
        {
            id: {
                type :DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            title: DataTypes.STRING,
            inviteTO: DataTypes.ARRAY(DataTypes.STRING),
            date:{type:DataTypes.DATEONLY,allowNull: false},
            time:{type:DataTypes.TIME,allowNull: false},
            meetLink:{type:DataTypes.STRING,allowNull: false},
            
        },
        { tabelName :"mettings"}
    );
    return Meetings;
};