import { Sequelize } from "sequelize";

const db = new Sequelize('task_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;