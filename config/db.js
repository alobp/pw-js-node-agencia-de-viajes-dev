import Sequelize from "sequelize";

// require('dotenv').config({path:"variables.env"});
import dotenv from 'dotenv';
dotenv.config();
// console.log(dotenv.config());
// const {DB_NOMBRE, DB_USER, DB_PASS, DB_HOST, DB_PORT} = dotenv.config().parsed;


// const db = new Sequelize('nombre_DB', 'nomre de usuario', 'password', {})
const db = new Sequelize( process.env.DB_NOMBRE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect:'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    operatorsAliases: false
});


export default db;