import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
const {DataTypes} = Sequelize;

const Tasks = db.define('tasks',{
    title : {
        type : DataTypes.STRING
    },
    description : {
        type : DataTypes.STRING
    },
    status : {
        type : DataTypes.STRING 
    },
    userId: {
        type : DataTypes.INTEGER,

    }

},{
    freezeTableName : true
});

Users.hasMany(Tasks);
Tasks.belongsTo(Users, {foreignKey : 'userId'});

export default Tasks;