import { Sequelize } from "sequelize";

import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    token : {
        type : DataTypes.STRING
    }

},{
    freezeTableName : true
});

export default Users;
